---
title: Cómo Reveal BI asegura tus datos de analítica integrada
description: >-
  Aprende a asegurar tus datos con la plataforma embedded BI de Reveal que
  incluye múltiples métodos de autenticación, almacenamiento en caché local de
  datos y mucho más.
date: '2019-07-15'
author: Casey Ciniello
cover: /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_security.jpg
summary: >-
  La plataforma de inteligencia de negocios integrada de Reveal se basa en una
  arquitectura en la nube que incluye múltiples métodos de autenticación,
  almacenamiento en caché local de datos para minimizar el envío de consultas a
  servidores y bases de datos, y mucho más. Exploraremos esto en este blog. La
  autenticación de Reveal utiliza el estándar OpenID Connect (OIDC). El
  componente Identity Service proporciona autenticación segura [&hellip;]
categories:
  - Perspectivas Técnicas
seo:
  title: Cómo Reveal BI asegura tus datos de analítica integrada - Reveal BI
  description: >-
    Aprende a asegurar tus datos con la plataforma embedded BI de Reveal que
    incluye múltiples métodos de autenticación, almacenamiento en caché local de
    datos y mucho más.
  ogTitle: Cómo Reveal BI asegura tus datos de analítica integrada - Reveal BI
  ogDescription: >-
    Aprende a asegurar tus datos con la plataforma embedded BI de Reveal que
    incluye múltiples métodos de autenticación, almacenamiento en caché local de
    datos y mucho más.
  ogType: article
  twitterTitle: Cómo Reveal BI asegura tus datos de analítica integrada - Reveal BI
  twitterDescription: >-
    Aprende a asegurar tus datos con la plataforma embedded BI de Reveal que
    incluye múltiples métodos de autenticación, almacenamiento en caché local de
    datos y mucho más.
  ogImage: /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_security.jpg
source_hash: 35aba7c1
source_locale: en
---
La plataforma de inteligencia de negocios con analítica integrada Reveal se basa en una arquitectura en la nube que incluye múltiples métodos de autenticación, almacenamiento en caché local de datos para minimizar el envío de consultas a servidores y bases de datos, y mucho más. Exploraremos esto en este blog.

## Autenticación

La autenticación de Reveal Cloud utiliza el estándar OpenID Connect (OIDC). El componente Identity Service proporciona autenticación segura contra múltiples fuentes de autenticación, incluidas cuentas de Google, Office 365 e Infragistics.

Reveal sigue el flujo estándar para la autenticación OIDC, como se puede ver en el diagrama a continuación que destaca la autenticación usando Microsoft.

![Reveal Cloud authentication ](/images/2020/10/5125.Security-Blog-Authentication-Flow.png)

Tenga en cuenta que Reveal nunca tiene acceso a las credenciales del usuario, ya que estas se introducen en una página proporcionada por el proveedor de autenticación (Google, Microsoft o Infragistics). El proveedor de autenticación luego redirige al usuario a Reveal con un código de acceso (paso 4). Luego, Reveal utiliza este código para obtener información del usuario, como la dirección de correo electrónico que identifica al usuario, y tokens que se utilizarán para acceder a otros servicios, incluido Google Drive para cuentas de Google o SharePoint y OneDrive para cuentas de Microsoft O365.

### Autenticación de Fuentes de Datos

Reveal admite múltiples fuentes de datos, como:

- Bases de datos relacionales—MS SQL Server, MySQL y otras
- Archivos de datos—CSV, Excel y JSON de Google Drive, Dropbox y otros
- Servicios en la nube—Salesforce, Dynamics CRM y más

Autenticar cualquiera de estas fuentes de datos depende del proveedor y cada una generalmente requiere un método de autenticación diferente. Reveal admite cuatro tipos de autenticación:

1. Anónimo
2. Usuario/contraseña
3. NTLM: usuario, contraseña y dominio
4. OAuth v2

### Fuentes de Datos OAuth

Para aquellos proveedores que admiten OAuth, como Google Drive, Dropbox, OneDrive y otros, Reveal redirigirá a los usuarios a la página de autenticación proporcionada por el proveedor de datos solicitando permiso para acceder a sus datos. Puede verlo a continuación:

![ Reveal authentication with OAuth Data Sources ](/images/2020/10/OAuth-Data-Sources-Diagram-Security-BLog.png)

“>

El proceso es similar al que discutimos con OIDC anteriormente. Una vez que la autenticación se completa, Reveal almacenará los tokens de autenticación para poder acceder a los datos en nombre del usuario en todas las plataformas compatibles.

### Seguridad de Datos

Para mejorar el rendimiento, Reveal almacena datos en caché localmente en el dispositivo, minimizando así el número de consultas enviadas al servidor o a la base de datos. Las credenciales para acceder a las fuentes de datos también se almacenan en el dispositivo, ya que solo se solicitan cuando la fuente de datos se configura o se utiliza por primera vez.

Aproveche el poder de los datos

Haga crecer su negocio con datos contextuales y en tiempo real.

[Solicitar una Demo](/request-demo)
