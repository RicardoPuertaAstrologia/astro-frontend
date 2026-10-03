/* ══════════════════════════════════════════════════════════════════
   LA COMPRA DEL ASTROMAPA
   Ricardo Puerta · Astrología
   ══════════════════════════════════════════════════════════════════

   Va DESPUÉS de compra.js y no lo reemplaza: se cuelga de lo que ya
   existe. Así el informe de la carta natal, que ya está vendiendo,
   no se toca.

   De qué se encarga:

     · la segunda tarjeta de compra, debajo de la del informe
     · la ida a Wompi con producto=mapa
     · el regreso de Wompi cuando lo comprado fue el mapa
     · la descarga del PDF y el aviso de que salió el correo

   DOS COSAS QUE HAY QUE TENER CLARAS

   1. LOS DOS PERMISOS SON DISTINTOS Y SE GUARDAN APARTE.
      El permiso del informe vive en 'rp_permiso' y el del mapa en
      'rp_permiso_mapa'. No se pisan: quien compre el mapa no abre los
      textos del informe, y al revés. El servidor lo comprueba por su
      cuenta —la referencia va firmada—, pero acá tampoco se mezclan.
      Un código de cortesía sí abre los dos; eso es a propósito.

   2. EL REGRESO DE WOMPI ES UNO SOLO PARA LOS DOS PRODUCTOS.
      Wompi devuelve a la misma dirección con ?id=... Hay que decidir
      cuál de los dos se compró, y eso lo dice la referencia: RPM- es
      el mapa, RP- es el informe. Si no se separaran, una compra del
      astromapa de US$ 20,99 dispararía además el envío del informe de
      US$ 24,99 por correo, gratis. Por eso compra.js lleva dos líneas
      nuevas que le ceden el turno a este archivo.
   ══════════════════════════════════════════════════════════════════ */

const MAPA_PERMISO = 'rp_permiso_mapa';
const MAPA_SIGLA = 'RPM-';

const MAPA_TEXTOS = {
  es: {
    rotulo: 'Tu astromapa',
    titulo: 'Tu carta natal sobre el mapa del mundo',
    puntos: [
      'El mapa completo, con tus catorce planetas y sus cuatro líneas',
      'Ocho segmentos de vida, cada uno con su propio mapa',
      'Tus líneas, tus cruces y las ciudades donde los tienes activos',
      'Más de 30 páginas en PDF, para descargar y para tu correo'
    ],
    hoy: 'hoy',
    trm: 'según la TRM del día',
    boton: 'Comprar mi astromapa',
    masInfo: '¿Qué trae el astromapa?',
    masInfoUrl: 'https://ricardopuerta.com/astromapa.html',

    correoTitulo: '¿A qué correo te mando el astromapa?',
    correoTexto: 'Te llega ahí y además lo descargas en esta pantalla, apenas se apruebe el pago.',
    correo: 'Tu correo electrónico',
    correo2: 'Escríbelo otra vez',
    irapagar: 'Ir a pagar',
    cerrar: 'Cerrar',
    cargando: 'Un momento…',
    errorCorreo: 'Escribe un correo electrónico válido.',
    errorIguales: 'Los dos correos no coinciden.',
    errorServidor: 'No se pudo preparar el pago. Puede que el servidor estuviera dormido: vuelve a intentarlo.',
    errorCarta: 'Primero calcula tu carta, en la pantalla de arriba. El astromapa se arma con tus datos de nacimiento.',

    confirmandoTitulo: 'Confirmando tu pago',
    confirmandoTexto: 'Un momento, por favor. Estoy comprobando el pago con el banco.',
    rechazadoTitulo: 'El pago no se pudo confirmar',
    rechazadoTexto: 'Si el dinero salió de tu cuenta, escríbeme y lo resuelvo: ricardopuerta@ricardopuerta.com',
    aprobadoTitulo: '¡Listo! Tu astromapa está pago',
    aprobadoTexto: 'Ya puedes descargarlo acá, y también te llega al correo.',
    descargar: 'Descargar mi astromapa',
    preparando: 'Armándolo…',
    aprobadoCorreo: 'Te lo estoy enviando a',
    enviando: 'Enviándote el astromapa al correo…',
    enviado: 'Listo, te lo envié a',
    noEnviado: 'No pude enviarte el correo, pero puedes descargarlo acá mismo. Si lo quieres por correo, escríbeme.',
    yaTienes: 'Tu astromapa',
    yaTienesTexto: 'Ya está pago. Puedes descargarlo cuantas veces quieras durante las próximas horas.',
    sinServidor: 'No se pudo armar el astromapa. Vuelve a intentarlo en un momento.'
  },
  en: {
    rotulo: 'Your astromap',
    titulo: 'Your birth chart on the map of the world',
    puntos: [
      'The full map, with your fourteen planets and their four lines',
      'Eight life segments, each with its own map',
      'Your lines, your crossings, and the cities where they are active',
      'More than 30 pages as a PDF, to download and in your inbox'
    ],
    hoy: 'today',
    trm: 'at the daily exchange rate',
    boton: 'Buy my astromap',
    masInfo: 'What does the astromap include?',
    masInfoUrl: 'https://ricardopuerta.com/en/astromap.html',

    correoTitulo: 'Which email should I send your astromap to?',
    correoTexto: 'It lands there, and you also download it on this screen as soon as the payment clears.',
    correo: 'Your email address',
    correo2: 'Type it again',
    irapagar: 'Go to payment',
    cerrar: 'Close',
    cargando: 'One moment…',
    errorCorreo: 'Please enter a valid email address.',
    errorIguales: 'The two addresses don&rsquo;t match.',
    errorServidor: 'The payment could not be prepared. The server may have been asleep: please try again.',
    errorCarta: 'Draw your chart first, on the screen above. The astromap is built from your birth data.',

    confirmandoTitulo: 'Confirming your payment',
    confirmandoTexto: 'One moment, please. I am checking the payment with the bank.',
    rechazadoTitulo: 'The payment could not be confirmed',
    rechazadoTexto: 'If the money left your account, write to me and I will sort it out: ricardopuerta@ricardopuerta.com',
    aprobadoTitulo: 'Done! Your astromap is paid for',
    aprobadoTexto: 'You can download it here, and it also lands in your inbox.',
    descargar: 'Download my astromap',
    preparando: 'Building it…',
    aprobadoCorreo: 'I am sending it to',
    enviando: 'Sending your astromap by email…',
    enviado: 'Done, I sent it to',
    noEnviado: 'I could not send the email, but you can download it right here. If you want it by email, write to me.',
    yaTienes: 'Your astromap',
    yaTienesTexto: 'It is paid for. You can download it as many times as you like over the next few hours.',
    sinServidor: 'The astromap could not be built. Please try again in a moment.'
  }
};

/* ── LA DIRECCIÓN CON LA QUE VOLVIÓ WOMPI ──
   Hay que leerla ACÁ ARRIBA, al cargar el archivo. compraRevisarRegreso
   corre en DOMContentLoaded y lo primero que hace es limpiar la
   dirección; para entonces ya sería tarde. */
const MAPA_REGRESO_ID = (function () {
  try { return new URLSearchParams(location.search).get('id') || ''; }
  catch (e) { return ''; }
})();


function mapaTextos() {
  return MAPA_TEXTOS[(typeof compraIdioma === 'function' && compraIdioma() === 'en') ? 'en' : 'es'];
}

function mapaLeer(clave) {
  try { return JSON.parse(sessionStorage.getItem(clave) || 'null'); }
  catch (e) { return null; }
}

function mapaEsDelMapa(referencia) {
  return String(referencia || '').toUpperCase().indexOf(MAPA_SIGLA) === 0;
}

/* Lo llama compra.js para saber si debe cederle el turno a este archivo. */
function mapaEsCompraDelMapa() {
  const g = mapaLeer('rp_compra');
  return !!(g && mapaEsDelMapa(g.referencia));
}
window.mapaEsCompraDelMapa = mapaEsCompraDelMapa;

/* El permiso para bajar el astromapa. Puede ser el suyo propio, o el de
   un código de cortesía, que abre los dos productos. */
function mapaPermiso() {
  const m = mapaLeer(MAPA_PERMISO);
  if (m && m.permiso && m.vence > Date.now()) return m.permiso;
  const g = mapaLeer('rp_permiso');
  if (g && g.permiso && g.vence > Date.now() &&
      String(g.referencia || '').toLowerCase().indexOf('cortesia') === 0) {
    return g.permiso;
  }
  return '';
}

function mapaTienePermiso() { return !!mapaPermiso(); }


/* ══════════════════════════════════════════════ LA TARJETA ══ */
/* Lo que haya pasado con la compra, para que la tarjeta lo sepa aunque la
   pantalla se repinte diez veces. */
let MAPA_RECIEN = null;     // {correo, estado} justo después de pagar

/* Vuelve a poner la tarjeta si alguien la borró.
   renderCompra, que pinta la tarjeta del INFORME, hace cont.innerHTML = ...
   después de pedirle el precio al servidor. O sea que llega tarde y se
   lleva por delante lo que hayamos puesto antes. Por eso la nuestra se
   repone varias veces durante los dos segundos siguientes, en vez de
   confiar en pintarla una sola vez. */
function mapaAsegurarTarjeta() {
  [0, 200, 600, 1200, 2000, 3000].forEach(function (ms) {
    setTimeout(function () { mapaPintarTarjeta('compra-wrap'); }, ms);
  });
}

function mapaEstadoAhora() {
  if (MAPA_RECIEN) return 'recien:' + (MAPA_RECIEN.estado || '');
  return mapaTienePermiso() ? 'pago' : 'vender';
}

function mapaPintarTarjeta(contenedorId) {
  const cont = document.getElementById(contenedorId || 'compra-wrap');
  if (!cont) return;
  if (typeof currentResult === 'undefined' || !currentResult) return;

  const estado = mapaEstadoAhora();
  const ya = document.getElementById('mapa-caja');
  if (ya) {
    if (ya.dataset.estado === estado && ya.dataset.idioma === compraIdioma()) return;
    ya.remove();
  }

  const t = mapaTextos();
  const caja = document.createElement('div');
  caja.id = 'mapa-caja';
  caja.dataset.estado = estado;
  caja.dataset.idioma = compraIdioma();
  caja.style.marginTop = cont.children.length ? '1.2rem' : '0';

  // ── recién pagado: la confirmación, con el estado del correo ──
  if (MAPA_RECIEN) {
    caja.innerHTML =
      '<div class="compra-caja">' +
        '<div class="compra-rotulo">' + t.rotulo + '</div>' +
        '<div class="compra-titulo">' + t.aprobadoTitulo + '</div>' +
        '<p style="margin:.4rem 0 1rem">' + t.aprobadoTexto + '</p>' +
        '<button type="button" class="compra-btn" id="mapa-bajar">' + t.descargar + '</button>' +
        '<div class="estado" id="mapa-estado-correo" style="margin-top:.9rem;font-size:.88rem">' +
          mapaTextoDelCorreo() + '</div>' +
      '</div>';
    cont.appendChild(caja);
    document.getElementById('mapa-bajar').addEventListener('click', mapaDescargar);
    return;
  }

  // ── ya lo tiene de antes: sólo la descarga ──
  if (mapaTienePermiso()) {
    caja.innerHTML =
      '<div class="compra-caja">' +
        '<div class="compra-rotulo">' + t.rotulo + '</div>' +
        '<div class="compra-titulo">' + t.yaTienes + '</div>' +
        '<p style="margin:.4rem 0 1rem">' + t.yaTienesTexto + '</p>' +
        '<button type="button" class="compra-btn" id="mapa-bajar">' + t.descargar + '</button>' +
      '</div>';
    cont.appendChild(caja);
    document.getElementById('mapa-bajar').addEventListener('click', mapaDescargar);
    return;
  }

  caja.innerHTML =
    '<div class="compra-caja">' +
      '<div class="compra-rotulo">' + t.rotulo + '</div>' +
      '<div class="compra-titulo">' + t.titulo + '</div>' +
      '<ul>' + t.puntos.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ul>' +
      '<div class="compra-accion">' +
        '<div class="compra-precio">' +
          '<span class="compra-usd">US$ 20.99</span>' +
          '<span class="compra-cop" id="mapa-cop"></span>' +
        '</div>' +
        '<button type="button" class="compra-btn" id="mapa-comprar">' + t.boton + '</button>' +
      '</div>' +
      // El enlace va discreto, como el de «¿Tienes un código de cortesía?»
      // de la tarjeta del informe: no compite con el botón de comprar.
      '<p style="margin:.9rem 0 0;font-size:.85rem">' +
        '<a href="' + t.masInfoUrl + '" target="_blank" rel="noopener" ' +
        'style="color:#5a5f67;text-decoration:underline;text-underline-offset:3px">' +
        t.masInfo + '</a>' +
      '</p>' +
    '</div>';
  cont.appendChild(caja);
  document.getElementById('mapa-comprar').addEventListener('click', mapaAbrirVentana);

  // El precio en pesos se pide aparte: si el servidor no contesta, la
  // tarjeta ya está pintada y sólo se queda sin esa línea.
  fetch(compraServidor() + '/precio?producto=mapa')
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (p) {
      if (!p || !p.cop) return;
      const linea = document.getElementById('mapa-cop');
      const usd = document.querySelector('#mapa-caja .compra-usd');
      if (usd && p.usd) usd.textContent = 'US$ ' + Number(p.usd).toFixed(2);
      if (linea) linea.textContent = t.hoy + ' ' + compraPesos(p.cop) + ' COP · ' + t.trm;
    })
    .catch(function () {});
}

function mapaTextoDelCorreo() {
  const t = mapaTextos();
  if (!MAPA_RECIEN) return '';
  const c = MAPA_RECIEN.correo || '';
  if (MAPA_RECIEN.estado === 'enviado') return t.enviado + ' ' + c;
  if (MAPA_RECIEN.estado === 'fallo') return t.noEnviado;
  return t.enviando;
}

/* renderCompra la llama app.js cada vez que repinta. Se envuelve igual
   que compra.js envuelve a renderResult. */
(function () {
  function envolver() {
    if (typeof window.renderCompra !== 'function' || window.renderCompra.__conMapa) return false;
    const original = window.renderCompra;
    const nuevo = function (contenedorId) {
      const r = original.apply(this, arguments);
      Promise.resolve(r).then(function () {
        setTimeout(function () { mapaPintarTarjeta(contenedorId); }, 50);
      });
      return r;
    };
    nuevo.__conMapa = true;
    window.renderCompra = nuevo;
    return true;
  }
  if (!envolver()) window.addEventListener('DOMContentLoaded', envolver);
})();


/* ══════════════════════════════════════════ IR A PAGAR ══ */
function mapaAbrirVentana() {
  const t = mapaTextos();
  let velo = document.getElementById('compra-velo');
  if (!velo) {
    velo = document.createElement('div');
    velo.className = 'compra-velo';
    velo.id = 'compra-velo';
    document.body.appendChild(velo);
    velo.addEventListener('click', function (e) {
      if (e.target === velo) velo.classList.remove('abierto');
    });
  }
  velo.innerHTML =
    '<div class="compra-ventana">' +
      '<button type="button" class="compra-cerrar" id="mapa-x" aria-label="' + t.cerrar + '">×</button>' +
      '<h3>' + t.correoTitulo + '</h3>' +
      '<p class="sub">' + t.correoTexto + '</p>' +
      '<div class="compra-campo"><label for="mapa-c1">' + t.correo + '</label>' +
        '<input id="mapa-c1" type="email" autocomplete="email"></div>' +
      '<div class="compra-campo"><label for="mapa-c2">' + t.correo2 + '</label>' +
        '<input id="mapa-c2" type="email" autocomplete="off"></div>' +
      '<div class="compra-error" id="mapa-error"></div>' +
      '<button type="button" class="compra-btn" id="mapa-pagar" style="width:100%">' + t.irapagar + '</button>' +
    '</div>';
  velo.classList.add('abierto');
  document.getElementById('mapa-x').addEventListener('click', function () {
    velo.classList.remove('abierto');
  });
  document.getElementById('mapa-pagar').addEventListener('click', mapaIrAPagar);
  setTimeout(function () { document.getElementById('mapa-c1').focus(); }, 60);
}

async function mapaIrAPagar() {
  const t = mapaTextos();
  const err = document.getElementById('mapa-error');
  const c1 = document.getElementById('mapa-c1').value.trim();
  const c2 = document.getElementById('mapa-c2').value.trim();
  const mal = function (m) { err.innerHTML = m; err.style.display = 'block'; };

  if (!compraCorreoValido(c1)) return mal(t.errorCorreo);
  if (c1.toLowerCase() !== c2.toLowerCase()) return mal(t.errorIguales);

  const nacimiento = compraNacimiento();
  if (!nacimiento) return mal(t.errorCarta);
  err.style.display = 'none';

  const boton = document.getElementById('mapa-pagar');
  boton.disabled = true;
  boton.textContent = t.cargando;

  let cobro;
  try {
    const r = await fetch(compraServidor() + '/cobro/crear?producto=mapa', { method: 'POST' });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    cobro = await r.json();
  } catch (e) {
    boton.disabled = false;
    boton.textContent = t.irapagar;
    return mal(t.errorServidor);
  }

  // Si el servidor no devolvió una referencia del mapa, algo quedó mal
  // configurado y el cobro se haría como si fuera el informe. Mejor
  // pararlo acá que cobrarle mal a alguien.
  if (!mapaEsDelMapa(cobro.referencia)) {
    boton.disabled = false;
    boton.textContent = t.irapagar;
    return mal(t.errorServidor);
  }

  try {
    sessionStorage.setItem('rp_compra', JSON.stringify({
      referencia: cobro.referencia,
      producto: 'mapa',
      correo: c1,
      idioma: compraIdioma(),
      nacimiento: nacimiento,
      carta: (typeof currentResult !== 'undefined' && currentResult) ? currentResult : null
    }));
  } catch (e) { /* si el navegador no deja guardar, el pago igual sigue */ }

  const form = document.createElement('form');
  form.method = 'GET';
  form.action = 'https://checkout.wompi.co/p/';
  const campos = {
    'public-key': cobro.llave_publica,
    'currency': cobro.moneda,
    'amount-in-cents': cobro.monto_en_centavos,
    'reference': cobro.referencia,
    'signature:integrity': cobro.firma_integridad,
    'redirect-url': location.origin + location.pathname,
    'customer-data:email': c1
  };
  Object.keys(campos).forEach(function (k) {
    const i = document.createElement('input');
    i.type = 'hidden'; i.name = k; i.value = campos[k];
    form.appendChild(i);
  });
  document.body.appendChild(form);
  form.submit();
}


/* ══════════════════════════════════ EL REGRESO DE WOMPI ══ */
async function mapaRevisarRegreso() {
  if (!MAPA_REGRESO_ID) return;
  const guardado = mapaLeer('rp_compra');
  if (!guardado || !mapaEsDelMapa(guardado.referencia)) return;   // no era el mapa

  history.replaceState({}, '', location.origin + location.pathname);
  if (guardado.idioma && typeof compraRestaurarIdioma === 'function') {
    compraRestaurarIdioma(guardado.idioma);
  }
  const t = mapaTextos();
  compraAviso('bien', t.confirmandoTitulo, t.confirmandoTexto);

  let r;
  try {
    const url = compraServidor() + '/cobro/verificar?id=' + encodeURIComponent(MAPA_REGRESO_ID) +
                '&referencia=' + encodeURIComponent(guardado.referencia);
    r = await (await fetch(url)).json();
  } catch (e) {
    compraAviso('mal', t.rechazadoTitulo, t.rechazadoTexto);
    return;
  }
  if (!r || !r.aprobado) {
    compraAviso('mal', t.rechazadoTitulo, t.rechazadoTexto);
    return;
  }

  try {
    sessionStorage.setItem(MAPA_PERMISO, JSON.stringify({
      permiso: r.permiso,
      referencia: r.referencia || guardado.referencia,
      correo: guardado.correo || '',
      vence: Date.now() + (r.horas || 6) * 3600 * 1000
    }));
  } catch (e) {}

  // Volver a pintar la carta que estaba en pantalla antes de pagar.
  if (guardado.carta && typeof renderResult === 'function') {
    try {
      currentResult = guardado.carta;
      document.getElementById('input-view').style.display = 'none';
      document.getElementById('result-view').classList.add('visible');
      renderResult(guardado.carta);
    } catch (e) { console.warn('No se pudo rearmar la carta:', e); }
  }

  // La confirmación NO va en un aviso suelto: va dentro de nuestra propia
  // tarjeta, que se repone sola. Un aviso suelto lo borraba renderCompra
  // al repintar la tarjeta del informe, y la persona se quedaba sin el
  // botón de descargar justo después de haber pagado.
  MAPA_RECIEN = { correo: guardado.correo || '', estado: 'enviando' };
  const viejo = document.querySelector('.compra-aviso');
  if (viejo) viejo.remove();
  mapaAsegurarTarjeta();

  mapaPedirCorreo(MAPA_REGRESO_ID, guardado);
}

/* Le pide al servidor que arme el PDF y lo mande al correo. */
async function mapaPedirCorreo(id, guardado) {
  if (!guardado.correo || !guardado.nacimiento) {
    MAPA_RECIEN = null;
    mapaAsegurarTarjeta();
    return;
  }

  try {
    const r = await fetch(compraServidor() + '/mapa/entregar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
        referencia: guardado.referencia,
        correo: guardado.correo,
        lang: guardado.idioma === 'en' ? 'en' : 'es',
        nacimiento: guardado.nacimiento
      })
    });
    const datos = await r.json();
    MAPA_RECIEN.estado = (r.ok && datos.correo_enviado) ? 'enviado' : 'fallo';
  } catch (e) {
    MAPA_RECIEN.estado = 'fallo';
  }
  const linea = document.getElementById('mapa-estado-correo');
  if (linea) linea.textContent = mapaTextoDelCorreo();
  const caja = document.getElementById('mapa-caja');
  if (caja) caja.dataset.estado = mapaEstadoAhora();
}


/* ══════════════════════════════════════════ LA DESCARGA ══ */
async function mapaDescargar(evento) {
  const t = mapaTextos();
  const boton = evento && evento.currentTarget ? evento.currentTarget : null;
  const etiqueta = boton ? boton.textContent : '';
  const permiso = mapaPermiso();

  // El nacimiento sale de la carta en pantalla; si la persona ya no la
  // tiene, se usa el que se guardó antes de ir a pagar.
  let nacimiento = compraNacimiento();
  if (!nacimiento) {
    const g = mapaLeer('rp_compra');
    if (g && g.nacimiento) nacimiento = g.nacimiento;
  }
  if (!permiso || !nacimiento) { alert(t.errorCarta); return; }

  if (boton) { boton.disabled = true; boton.textContent = t.preparando; }
  try {
    const r = await fetch(compraServidor() + '/mapa/pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        permiso: permiso, lang: compraIdioma(), nacimiento: nacimiento
      })
    });
    if (!r.ok) throw new Error('el servidor respondió ' + r.status);
    const archivo = await r.blob();
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(archivo);
    const base = (compraIdioma() === 'en') ? 'Astromap - ' : 'Astromapa - ';
    enlace.download = (base + (nacimiento.name || 'astromapa')).trim() + '.pdf';
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    setTimeout(function () { URL.revokeObjectURL(enlace.href); }, 4000);
  } catch (e) {
    console.warn('No se pudo bajar el astromapa:', e);
    alert(t.sinServidor);
  } finally {
    if (boton) { boton.disabled = false; boton.textContent = etiqueta; }
  }
}


window.addEventListener('DOMContentLoaded', mapaRevisarRegreso);
