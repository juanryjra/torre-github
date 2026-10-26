/**
 * Registro de La Torre de la Evaluación.
 * Pega este código en Extensiones > Apps Script de una Hoja de cálculo de Google
 * y despliégalo como "Aplicación web" (Ejecutar como: Yo · Acceso: Cualquier usuario).
 */
const CLAVE_DOCENTE = 'santillana2026';   // necesaria para borrar registros desde el panel docente
const HOJA = 'Jugadores';
const CAMPOS = ['id', 'nombre', 'grupo', 'puntos', 'mejorPuntaje', 'retoActual', 'retosSuperados', 'reinicios',
  'estado', 'tiempoSeg', 'bonoTiempo', 'compromiso', 'inicio', 'fin', 'actualizado'];
const TEXTO = ['id', 'nombre', 'grupo', 'estado', 'compromiso', 'inicio', 'fin', 'actualizado'];

function hoja_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(HOJA);
  if (!sh) {
    sh = ss.insertSheet(HOJA);
    sh.appendRow(CAMPOS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, CAMPOS.length).setFontWeight('bold');
    // Columnas de texto en formato texto plano, para que Sheets no convierta "9-2" en fecha.
    TEXTO.forEach(c => sh.getRange(1, CAMPOS.indexOf(c) + 1, sh.getMaxRows(), 1).setNumberFormat('@'));
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Evita que un texto escrito por un participante se interprete como fórmula.
function limpio_(v) {
  if (typeof v === 'number' || typeof v === 'boolean') return v;
  const s = String(v == null ? '' : v).slice(0, 500);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function doGet() {
  const sh = hoja_();
  const valores = sh.getDataRange().getValues();
  const cab = valores.shift();
  const jugadores = valores.filter(r => r[0] !== '').map(r => {
    const o = {};
    cab.forEach((c, i) => o[c] = r[i] instanceof Date ? r[i].toISOString() : r[i]);
    return o;
  });
  return json_({ ok: true, jugadores: jugadores });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const b = JSON.parse(e.postData.contents);
    if (!b.id || !/^[a-z0-9]{6,40}$/i.test(b.id)) return json_({ ok: false, error: 'id' });
    const sh = hoja_();
    const valores = sh.getDataRange().getValues();
    const cab = valores[0];
    let fila = -1;
    for (let i = 1; i < valores.length; i++) if (String(valores[i][0]) === b.id) { fila = i + 1; break; }

    if (b.action === 'delete') {
      if (b.clave !== CLAVE_DOCENTE) return json_({ ok: false, error: 'clave' });
      if (fila > 0) sh.deleteRow(fila);
      return json_({ ok: true });
    }

    if (b.action === 'upsert') {
      const d = b.data || {};
      const actual = fila > 0 ? valores[fila - 1].slice() : cab.map(() => '');
      actual[0] = b.id;
      cab.forEach((c, i) => { if (c !== 'id' && Object.prototype.hasOwnProperty.call(d, c)) actual[i] = limpio_(d[c]); });
      if (fila > 0) sh.getRange(fila, 1, 1, cab.length).setValues([actual]);
      else sh.appendRow(actual);
      return json_({ ok: true });
    }

    return json_({ ok: false, error: 'accion' });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
