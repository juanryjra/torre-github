# La Torre de la Evaluación · Escape room

Escape room interactivo (30 minutos) sobre **Evaluación para el aprendizaje**. Los participantes suben una torre de **seis pisos**. Los retos se diseñaron siguiendo la taxonomía de Bloom, pero eso **no se muestra a los participantes**; solo aparece en el solucionario del orientador.

| Piso | Reto | Diseñado para (Bloom) |
|---|---|---|
| 1 | El Pergamino de la Memoria: definición y los tres sellos de la retroalimentación | Recordar |
| 2 | La Guarida de los Mitos: mitos y verdades de la evaluación | Comprender |
| 3 | La Máquina del Proceso: ordenar el proceso y aplicarlo a un caso de aula | Aplicar |
| 4 | El Laboratorio de las Esencias: formativa vs. sumativa y análisis de comentarios | Analizar |
| 5 | Los Dados del Oráculo: la escalera de la retroalimentación jugada con dados | Evaluar |
| 6 | La Cerradura Viviente: código, palabra clave y una retroalimentación completa | Crear |

Incluye: repaso inicial de los temas con cada guardián, sonidos, 5 vidas por piso (si se pierden, se vuelve a empezar), vidas extra (las runas del piso 5 y las que envía el coach), felicitación con puntos y dado de la fortuna en cada piso, una sílaba por piso para armar la palabra clave, Top 5 siempre visible, **versión docente** con contraseña y un **bonus final**: una Escalera de la Retroalimentación práctica para llevar al aula.

Los participantes **no necesitan crear ninguna cuenta**: solo abren el enlace.

## Archivos

```
index.html                     El juego completo
config.js                      Aquí va la URL del registro (paso 2)
img/                           Retratos de los guardianes
google-apps-script/Code.gs     Código del registro en Google Sheets (paso 1)
```

## Paso 1 · Crear el registro en Google Sheets (5 minutos, gratis)

GitHub Pages solo publica archivos; para que los puntajes de todos lleguen al panel docente se guardan en una Hoja de cálculo de Google.

1. Entra a <https://sheets.new> con tu cuenta de Gmail y nombra la hoja, por ejemplo *Registro Torre de la Evaluación*.
2. Menú **Extensiones → Apps Script**.
3. Borra lo que aparece y pega todo el contenido de `google-apps-script/Code.gs`. Guarda (icono de disquete).
4. Botón **Implementar → Nueva implementación**.
   - Tipo (engranaje): **Aplicación web**.
   - Ejecutar como: **Yo**.
   - Quién tiene acceso: **Cualquier usuario**.
5. Pulsa **Implementar** y autoriza los permisos (Google mostrará "Google no ha verificado esta app": entra en *Configuración avanzada → Ir a … (no seguro)*; es tu propio script).
6. Copia la **URL de la aplicación web** (termina en `/exec`).

## Paso 2 · Pegar la URL en `config.js`

```js
window.TORRE_CONFIG = {
  urlRegistro: "https://script.google.com/macros/s/XXXXXXXX/exec"
};
```

## Paso 3 · Publicar en GitHub Pages

1. En GitHub crea un repositorio nuevo **público** (por ejemplo `torre-evaluacion`).
2. **Add file → Upload files** y arrastra `index.html`, `config.js`, `README.md` y la carpeta `img` (la carpeta `google-apps-script` es opcional). **Commit changes**.
3. **Settings → Pages** → *Source*: **Deploy from a branch** → *Branch*: `main` / `(root)` → **Save**.
4. En uno o dos minutos tu juego estará en `https://TU-USUARIO.github.io/torre-evaluacion/`.

### Si ya tenías publicada la versión anterior

1. Reemplaza `index.html` y sube la carpeta `img` completa. `config.js` sigue igual.
2. **Actualiza el script de Google** (necesario para el botón «+1 vida» y la columna de vidas): en la hoja, *Extensiones → Apps Script*, reemplaza el código por el nuevo `Code.gs`, guarda y ve a *Implementar → Gestionar implementaciones → editar (lápiz) → Versión: Nueva versión → Implementar*. La URL no cambia.

## Uso

- **Participantes:** abren el enlace, se registran con nombre y grupo y juegan. Si recargan la página por accidente, en la portada aparece **«Continuar expedición»**.
- **Docente:** botón *Acceso docente* (abajo en la portada), contraseña `santillana2026`. Ve el progreso de cada persona (piso actual y vidas), puntajes, reinicios, tiempo y compromisos, y puede enviar un corazón extra con **+1 vida** (llega en unos 10 segundos); se actualiza cada 10 segundos y se puede descargar en CSV. Los datos también quedan en la hoja de Google.
- **Respuestas de la cerradura final:** código **3536**, palabra clave **APRENDIZAJE** (A · PREN · DI · ZA · JE).

## Notas

- Si `urlRegistro` queda vacía, el juego funciona en **modo de prueba** (los puntajes solo se guardan en ese navegador).
- La contraseña docente está dentro de `index.html`, así que es una barrera sencilla, no seguridad fuerte. Borrar registros sí exige la contraseña en el servidor. Para cambiarla, edítala en `index.html` (`const PASS`) **y** en `Code.gs` (`CLAVE_DOCENTE`), y vuelve a implementar el script (*Implementar → Gestionar implementaciones → editar → Nueva versión*).
- Si cambias el código de `Code.gs`, crea siempre una **nueva versión** de la implementación; la URL se mantiene.
