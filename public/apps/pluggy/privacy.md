# Política de Privacidad de Pluggy

**Última actualización:** 11 de agosto de 2026

Esta Política de Privacidad describe cómo **Pluggy** ("nosotros", "nuestra aplicación" o "el servicio") gestiona la información y los datos del usuario. Pluggy es una aplicación dedicada a la localización y visualización de puntos de recarga para vehículos eléctricos (EV).

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

### Condiciones de la recopilación de ubicación:
- **Solo en primer plano (Foreground):** La aplicación únicamente accede a la ubicación mientras está abierta y en uso en la pantalla del dispositivo.
- **Sin rastreo en segundo plano:** Pluggy **NO** recopila, rastrea ni almacena la ubicación del usuario cuando la aplicación está cerrada o en segundo plano.
- **Sin compartición comercial:** Tus datos de ubicación **NO** se alquilan, se venden ni se comparten con anunciantes ni redes publicitarias.

---

## 3. Datos Personales y Cuentas de Usuario

- **Sin Registro ni Cuentas:** Pluggy no requiere crear una cuenta de usuario, iniciar sesión ni proporcionar nombres, direcciones de correo electrónico, números de teléfono ni ningún otro dato de identificación personal (PII).
- **Sin Datos Financieros:** La aplicación no procesa pagos, suscripciones ni almacena datos bancarios.

---

## 4. Almacenamiento Local en el Dispositivo

Pluggy utiliza el almacenamiento local del dispositivo (`SharedPreferences` y archivos en caché) con el único fin de mejorar la experiencia de usuario y el rendimiento:
- **Preferencias de Usuario:** Guardar el idioma seleccionado (español, inglés, gallego) y la configuración del mapa (modo oscuro/claro, estilo de mapa).
- **Caché de Referencia:** Almacenar temporalmente metadatos públicos de conectores y operadores de carga para reducir el consumo de datos móviles y acelerar la carga.

Estos datos permanecen únicamente en tu dispositivo y no se envían a servidores propios.

---

## 5. Servicios de Terceros e Intercambio de Información

Para prestar el servicio de mapas y datos de recarga, Pluggy interactúa con las siguientes APIs y servicios externos mediante solicitudes HTTP cifradas (HTTPS):

1. **OpenChargeMap (API de Puntos de Recarga):**
   - Se realizan peticiones para obtener las coordenadas y características de los cargadores cercanos al área del mapa. No se envía ninguna información identificativa del usuario.
2. **OpenStreetMap y Nominatim (Servicio de Búsqueda de Lugares):**
   - Cuando buscas una ciudad o dirección, la consulta de texto se envía a Nominatim para obtener la ubicación geográfica correspondiente.
3. **Proveedores de Teselas de Mapa (OpenStreetMap, CARTO, Esri):**
   - Para renderizar las capas del mapa visual, la aplicación solicita imágenes (teselas) a estos proveedores. Como en cualquier petición web estándar, estos servidores reciben la dirección IP técnica necesaria para entregar las imágenes.
4. **Aplicaciones de Navegación Externa:**
   - Si seleccionas la opción "Cómo llegar", la app iniciará tu aplicación de navegación preferida (Google Maps, Apple Maps, Waze) enviando únicamente las coordenadas de destino del punto de carga.

---

## 6. Publicidad y Analítica

- **Sin Publicidad:** Pluggy **NO** contiene anuncios ni integra SDKs publicitarios (como AdMob).
- **Sin Rastreadores de Analítica:** Pluggy **NO** utiliza herramientas de seguimiento de terceros ni SDKs de analítica de comportamiento (como Firebase Analytics, Facebook SDK, etc.).

---

## 7. Seguridad de los Datos

Toda la comunicación de red entre Pluggy y las APIs externas se realiza obligatoriamente mediante protocolos de comunicación cifrados **HTTPS (TLS/SSL)** para garantizar la integridad y seguridad de la información procesada.

---

## 8. Derechos del Usuario y Control de Datos

Como usuario, mantienes en todo momento el control total sobre tus datos:

- **Desactivar Permisos de Ubicación:** Puedes revocar el acceso a la ubicación en cualquier momento desde los ajustes de tu dispositivo Android:  
  `Ajustes > Aplicaciones > Pluggy > Permisos > Ubicación`
- **Eliminación de Datos Locales:** Puedes borrar la caché y las preferencias almacenadas borrando los datos de la aplicación desde los ajustes de Android o simplemente desinstalando la aplicación.

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
