# Política de Privacidad de Mercalist

**Última actualización:** 20 de agosto de 2026

Esta Política de Privacidad describe cómo **Mercalist** ("nosotros", "nuestra aplicación" o "el servicio") recopila, utiliza, almacena y protege la información de los usuarios. Mercalist es una aplicación móvil diseñada para facilitar la organización de listas de la compra, consulta de productos y precios orientativos, permitiendo tanto el uso sin conexión como la sincronización y colaboración en tiempo real en la nube.

Cumplimos rigurosamente con los requisitos de la normativa vigente de protección de datos (Reglamento General de Protección de Datos - RGPD / LOPDGDD) y con las directrices y políticas de seguridad y datos de usuario de Google Play.

---

## 1. Identificación del Responsable del Tratamiento

- **Nombre de la Aplicación:** Mercalist
- **Identificador de Paquete (Package ID):** `com.dpatrongomez.mercalist`
- **Desarrollador Responsable:** Daniel Patrón Gómez
- **Contacto de Privacidad y Soporte:** [dpatrongomez@gmail.com](mailto:dpatrongomez@gmail.com)

---

## 2. Información y Datos que Recopilamos

### A. Modo Local (Sin inicio de sesión)
Mercalist puede utilizarse completamente sin crear una cuenta ni iniciar sesión:
- **Sin datos personales:** En este modo, no recopilamos ni transmitimos a ningún servidor externo tu nombre, correo electrónico ni ningún dato que permita identificarte personalmente.
- **Datos locales:** Las listas de la compra, categorías personalizadas, notas y marcas de productos se guardan de forma exclusiva en el almacenamiento interno de tu dispositivo.

### B. Modo Nube y Colaboración (Con inicio de sesión vía Google)
Para habilitar la creación de listas compartidas y su sincronización en tiempo real entre múltiples dispositivos y usuarios, ofrecemos el inicio de sesión opcional con tu **cuenta de Google** (a través de Google Sign-In / Firebase Authentication).

Cuando decides identificarte, recopilamos y procesamos únicamente los siguientes datos básicos facilitados por el proveedor de autenticación:
- **Nombre y apellidos (Display Name):** Para identificarte de forma amigable ante otros colaboradores en las listas compartidas.
- **Dirección de correo electrónico (Email):** Para vincular de forma unívoca tu cuenta y permitir que otros usuarios te inviten a compartir listas.
- **Identificador único de usuario (Firebase UID):** Un código técnico anonimizado que asocia tus listas y permisos.
- **Foto de perfil pública (Avatar URL):** Si la tienes configurada en tu cuenta de Google, para mostrarla en tu perfil de la app y junto a las listas compartidas.

### C. Contenido de las Listas en la Nube
Si creas o participas en listas sincronizadas en la nube:
- Almacenamos en nuestra base de datos segura en la nube (Google Cloud Firestore) el nombre de la lista, los artículos o productos añadidos (título, cantidad, notas, estado tachado/marcado) y los identificadores de los miembros colaboradores.

### D. Datos No Recopilados
- **No recopilamos datos financieros:** La aplicación no almacena números de tarjeta de crédito, cuentas bancarias ni gestiona transacciones monetarias directas.
- **No recopilamos ubicación en tiempo real:** No solicitamos ni accedemos a datos de geolocalización GPS.
- **No accedemos a información sensible:** No accedemos a tu lista de contactos telefónicos, registro de llamadas, SMS, cámara (salvo que en futuras versiones se añada escaneo de códigos de barra explícito) ni galería personal de fotos.

---

## 3. Finalidad del Tratamiento de Datos

Los datos recopilados se utilizan estrictamente para:
1. **Prestación del servicio:** Proporcionar la funcionalidad de listas de compra, sincronización multidispotivo y colaboración en vivo entre usuarios.
2. **Autenticación y seguridad:** Validar el acceso autorizado a listas privadas y compartidas mediante reglas de seguridad en la nube.
3. **Mejora técnica y estabilidad:** Garantizar la velocidad de carga, evitar conflictos de sincronización y gestionar la memoria caché de imágenes y catálogo.

**No vendemos, no alquilamos ni comercializamos tus datos personales con terceros para fines publicitarios o de marketing bajo ninguna circunstancia.**

---

## 4. Almacenamiento Local y Caché en el Dispositivo

Mercalist utiliza tecnologías de almacenamiento local en tu terminal (base de datos local Hive y SharedPreferences) con el objetivo de:
- Permitir la plena operatividad de la aplicación en ausencia de conexión a Internet (modo offline).
- Guardar tus preferencias de interfaz (modo oscuro/claro, visualización compacta, orden de productos).
- Almacenar en caché temporal las imágenes del catálogo para acelerar la carga y minimizar el consumo de datos móviles.

*Nota:* Puedes eliminar la caché o restablecer la base de datos local en cualquier momento desde el menú `Ajustes > Legal y Privacidad / Datos y Almacenamiento`.

---

## 5. Proveedores de Servicios y Terceros

Para la infraestructura en la nube y el correcto funcionamiento técnico, utilizamos servicios gestionados por **Google LLC**:
- **Firebase Authentication:** Gestión segura y cifrada de sesiones de usuario con Google Sign-In.
- **Google Cloud Firestore:** Base de datos NoSQL cifrada en reposo y en tránsito para la sincronización de listas en tiempo real.
- **Google Play Services:** Servicios base del sistema operativo Android para la distribución, verificación de integridad y actualización de la app.

Estos proveedores cumplen con los estándares de seguridad de la industria y la normativa de protección de datos aplicable en la Unión Europea.

---

## 6. Seguridad de la Información

Implementamos medidas técnicas y organizativas adecuadas para proteger tus datos:
- **Cifrado en tránsito (HTTPS/TLS):** Toda la comunicación entre la aplicación y los servicios en la nube se realiza mediante protocolos seguros y cifrados.
- **Control de accesos:** Las reglas de seguridad de Firestore impiden que usuarios no autorizados lean, modifiquen o eliminen listas a las que no han sido expresamente añadidos.

---

## 7. Retención y Eliminación de Datos (Derecho de Supresión)

- **Cierre de sesión:** Puedes cerrar sesión cuando lo desees desde tu pantalla de Perfil en los Ajustes de la app.
- **Eliminación de listas:** Puedes borrar listas individuales (locales o en la nube) en cualquier momento desde la interfaz.
- **Eliminación completa de cuenta y datos:** Si deseas eliminar tu cuenta de usuario y todos los datos asociados almacenados en la nube de forma permanente, puedes solicitarlo enviando un correo a [dpatrongomez@gmail.com](mailto:dpatrongomez@gmail.com) con el asunto *"Eliminación de Cuenta Mercalist"* indicando el email asociado. Procederemos a la supresión irreversible de tus datos de nuestros servidores en un plazo máximo de 30 días.

---

## 8. Privacidad de Menores

Mercalist no está dirigida a menores de 13 años (o la edad mínima legal en su territorio) y no recopila deliberadamente información personal de menores. Si un progenitor o tutor tiene conocimiento de que un menor nos ha facilitado información sin consentimiento, le rogamos que nos contacte para proceder a la eliminación inmediata de dichos registros.

---

## 9. Derechos del Usuario (RGPD / LOPD)

Tienes derecho a:
- Solicitar el acceso a los datos personales que conservamos sobre ti.
- Solicitar la rectificación de datos inexactos o incompletos.
- Solicitar la supresión de tus datos cuando ya no sean necesarios para los fines que fueron recogidos.
- Oponerte al tratamiento o solicitar su limitación.
- Solicitar la portabilidad de tus datos.

Para ejercer cualquiera de estos derechos, ponte en contacto con nosotros en [dpatrongomez@gmail.com](mailto:dpatrongomez@gmail.com).

---

## 10. Modificaciones a esta Política

Podemos actualizar nuestra Política de Privacidad de forma periódica para reflejar mejoras en la aplicación o cambios legales. Te notificaremos cualquier cambio relevante actualizando la fecha de *"Última actualización"* en este documento y dentro de la propia aplicación.

---

## 11. Contacto

Si tienes cualquier duda, sugerencia o reclamación relativa a esta política o al tratamiento de tus datos, puedes contactar con:

- **Responsable:** Daniel Patrón Gómez
- **Email:** [dpatrongomez@gmail.com](mailto:dpatrongomez@gmail.com)
