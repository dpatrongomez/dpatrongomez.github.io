# Política de Privacidad de Pluggy

**Última actualización:** 7 de octubre de 2026

Esta Política de Privacidad describe cómo **Pluggy** ("nosotros", "nuestra aplicación" o "el servicio") gestiona la información y los datos del usuario. Pluggy es una aplicación dedicada a la localización y visualización de puntos de recarga para vehículos eléctricos (EV), la planificación de rutas con paradas de carga y su uso desde Android Auto.

Cumplimos estrictamente con las políticas de privacidad y datos de usuario de Google Play (incluyendo la normativa de transparencia y permisos sensibles de Android).

---

## 1. Identificación del Desarrollador y la Aplicación

- **Nombre de la Aplicación:** Pluggy
- **Identificador de Paquete (Package ID):** `com.dpatrongomez.pluggy`
- **Desarrollador Responsable:** Daniel Patrón Gómez
- **Contacto de Privacidad:** [dpatrongomez@gmail.com](mailto:dpatrongomez@gmail.com)

---

## 2. Recopilación y Uso de Datos de Ubicación (Permisos Sensibles)

Pluggy requiere acceso a la ubicación del dispositivo para ofrecer sus funciones principales de búsqueda y navegación.

### Permisos Solicitados:
- **`ACCESS_FINE_LOCATION`** (Ubicación precisa)
- **`ACCESS_COARSE_LOCATION`** (Ubicación aproximada)

### Finalidad del uso de la ubicación:
- **Visualización en el mapa:** Mostrar tu posición actual en el mapa interactivo para facilitarte la orientación.
- **Búsqueda de estaciones cercanas:** Filtrar y consultar los puntos de recarga de vehículos eléctricos más próximos a ti.
- **Cálculo de distancias:** Calcular la distancia entre tu ubicación y la estación de recarga seleccionada.
- **Planificador de rutas:** Usar tu posición actual como punto de origen de una ruta, si así lo eliges.
- **Android Auto:** Centrar el mapa del coche en tu posición y mostrar las estaciones más cercanas en la pantalla del vehículo.

### Condiciones de la recopilación de ubicación:
- **Solo con la app en uso:** La aplicación únicamente accede a la ubicación mientras Pluggy está abierta y en uso en el teléfono o mientras su pantalla de Android Auto está visible en el vehículo.
- **Sin rastreo en segundo plano:** Pluggy **NO** recopila, rastrea ni almacena la ubicación del usuario cuando la aplicación está cerrada o en segundo plano, ni guarda un historial de tus desplazamientos.
- **Sin compartición comercial:** Tus datos de ubicación **NO** se alquilan, se venden ni se comparten con anunciantes ni redes publicitarias.

---

## 3. Cuenta de OpenChargeMap (opcional) y Contenido del Usuario

- **Pluggy no tiene cuentas propias:** No necesitas registrarte para buscar estaciones, planificar rutas ni usar Android Auto, y Pluggy no solicita nombre, número de teléfono ni otros datos de identificación personal para ello.
- **Inicio de sesión opcional:** Si quieres subir fotos de estaciones, puedes iniciar sesión con tu cuenta de **OpenChargeMap**. La creación de la cuenta se realiza en la web de OpenChargeMap.
- **Qué datos se tratan:** Tu correo electrónico y tu contraseña se envían por HTTPS directamente a OpenChargeMap para autenticarte. Pluggy **NO** almacena tu contraseña. En tu dispositivo solo se guardan, en el almacenamiento seguro de Android (Keystore), el token de sesión que devuelve OpenChargeMap, tu nombre público y tu correo electrónico.
- **Cerrar sesión:** Al cerrar sesión desde la app, esos datos se eliminan del dispositivo.
- **Fotos de estaciones:** Si subes una foto, puedes hacerla con la cámara o elegirla de tu galería, y añadir un comentario opcional. La foto, el comentario y tu nombre público se envían a OpenChargeMap y **pasan a ser públicos** en su servicio, bajo sus términos y licencias. Pluggy no accede a otras fotos de tu galería.
- **Eliminar tus fotos:** Puedes borrar desde la app las fotos que hayas subido con tu cuenta. La gestión o eliminación de la cuenta de OpenChargeMap se realiza directamente en su web.
- **Sin Datos Financieros:** La aplicación no procesa pagos, suscripciones ni almacena datos bancarios.

---

## 4. Almacenamiento Local en el Dispositivo

Pluggy utiliza el almacenamiento local del dispositivo (`SharedPreferences`, almacenamiento seguro y archivos en caché) con el único fin de mejorar la experiencia de usuario y el rendimiento:
- **Preferencias de Usuario:** Idioma seleccionado (español, inglés, gallego), modo oscuro/claro, estilo de mapa y opciones de visualización.
- **Datos de tu vehículo:** Capacidad de la batería, consumo y velocidades de carga que introduces para estimar rutas y tiempos de carga.
- **Preferencias de rutas y precios:** Redes de carga preferidas y precios o descuentos que configuras por operador.
- **Lugares guardados:** Si guardas direcciones como casa, trabajo o favoritos, sus coordenadas y nombres se guardan **solo en tu dispositivo** para reutilizarlas como origen o destino de rutas.
- **Sesión de OpenChargeMap:** Si has iniciado sesión, los datos descritos en la sección 3, en el almacenamiento seguro.
- **Caché de Referencia:** Metadatos públicos de conectores y operadores de carga, y estaciones consultadas recientemente, para reducir el consumo de datos móviles y acelerar la carga.

Estos datos permanecen únicamente en tu dispositivo. Pluggy no los envía a servidores propios ni los asocia a una identidad.

---

## 5. Servicios de Terceros e Intercambio de Información

Para prestar el servicio de mapas, rutas y datos de recarga, Pluggy interactúa con las siguientes APIs y servicios externos mediante solicitudes cifradas (HTTPS). Como en cualquier petición web, estos servidores reciben la dirección IP técnica necesaria para responder:

1. **OpenChargeMap (puntos de recarga y cuenta):**
   - Se realizan peticiones para obtener las coordenadas y características de los cargadores del área del mapa, y los datos de referencia de operadores y conectores. No se envía información identificativa del usuario, salvo que hayas iniciado sesión para subir o borrar fotos (sección 3).
2. **API de respaldo de Pluggy (alojada en Vercel):**
   - Si OpenChargeMap no está disponible, Pluggy consulta una API propia alojada en Vercel que replica los datos públicos de OpenChargeMap. Recibe el área visible del mapa que se está consultando, sin cuenta ni identificadores del usuario. Vercel, como proveedor de alojamiento, puede tratar la dirección IP técnica de la conexión.
3. **OpenStreetMap y Nominatim (búsqueda de lugares):**
   - Cuando buscas una ciudad o dirección, la consulta de texto se envía a Nominatim para obtener la ubicación correspondiente. También se envían coordenadas para obtener el nombre de un lugar (geocodificación inversa). Esto ocurre tanto en el teléfono como en Android Auto.
4. **Servicios de cálculo de rutas (Valhalla y OSRM, sobre datos de OpenStreetMap):**
   - Al planificar una ruta, se envían las coordenadas de origen, destino y paradas intermedias a estos servicios públicos para calcular el trayecto. No se envía ningún identificador del usuario.
5. **Proveedores de Teselas de Mapa (OpenStreetMap, CARTO, Esri, OpenFreeMap):**
   - Para renderizar las capas del mapa visual, en el teléfono y en Android Auto, la aplicación solicita imágenes y datos de mapa (teselas) a estos proveedores.
6. **Android Auto (Google):**
   - Al usar Pluggy en Android Auto, la información que se muestra en la pantalla del vehículo (estaciones, nombres, distancias) la presenta el sistema Android Auto de Google. Su tratamiento se rige por la política de privacidad de Google.
7. **Aplicaciones de Navegación Externa:**
   - Si seleccionas la opción "Cómo llegar", la app iniciará tu aplicación de navegación preferida (por ejemplo Google Maps o Waze) enviando únicamente las coordenadas de destino del punto de carga. En Android Auto, el destino se envía a la aplicación de navegación del vehículo.
8. **Documentos legales:**
   - Al abrir esta política o los Términos dentro de la app, se descargan desde GitHub Pages (o Vercel como alternativa).

---

## 6. Publicidad y Analítica

- **Sin Publicidad:** Pluggy **NO** contiene anuncios ni integra SDKs publicitarios (como AdMob).
- **Sin Rastreadores de Analítica:** Pluggy **NO** utiliza herramientas de seguimiento de terceros ni SDKs de analítica de comportamiento (como Firebase Analytics, Facebook SDK, etc.).

---

## 7. Seguridad de los Datos

Toda la comunicación de red entre Pluggy y las APIs externas se realiza mediante protocolos de comunicación cifrados **HTTPS (TLS/SSL)** para garantizar la integridad y seguridad de la información procesada. La sesión de OpenChargeMap se guarda en el almacenamiento seguro del sistema (Android Keystore).

---

## 8. Derechos del Usuario y Control de Datos

Como usuario, mantienes en todo momento el control sobre tus datos:

- **Desactivar Permisos de Ubicación:** Puedes revocar el acceso a la ubicación en cualquier momento desde los ajustes de tu dispositivo Android:  
  `Ajustes > Aplicaciones > Pluggy > Permisos > Ubicación`
- **Cerrar sesión y borrar fotos:** Puedes cerrar la sesión de OpenChargeMap y eliminar tus fotos desde la propia app.
- **Eliminación de Datos Locales:** Puedes borrar la caché, las preferencias, los lugares guardados y la sesión almacenados borrando los datos de la aplicación desde los ajustes de Android o simplemente desinstalando la aplicación.
- **Datos en OpenChargeMap:** Para acceder, rectificar o eliminar los datos de tu cuenta de OpenChargeMap, o contenido suyo que no puedas borrar desde Pluggy, debes dirigirte a OpenChargeMap. También puedes escribirnos y te ayudaremos en lo posible.

---

## 9. Protección de Menores

Pluggy no está dirigida a niños menores de 13 años (o la edad legal aplicable en su jurisdicción). No recopilamos a sabiendas información personal de menores.

---

## 10. Cambios en esta Política de Privacidad

Nos reservamos el derecho de actualizar esta Política de Privacidad para reflejar cambios en la aplicación o requerimientos legales y de Google Play. Cualquier modificación será publicada en esta misma página con la fecha de actualización revisada.

---

## 11. Contacto

Si tienes alguna pregunta, duda o solicitud sobre esta Política de Privacidad o el tratamiento de datos en Pluggy, puedes contactarnos en:

- **Correo Electrónico:** [dpatrongomez@gmail.com](mailto:dpatrongomez@gmail.com)
