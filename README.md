# Cuna Inteligente - Frontend

Este repositorio contiene el frontend del proyecto **Cuna Inteligente**, desarrollado con Vue.js y Vite. Su principal función es proporcionar una interfaz gráfica para que los usuarios puedan monitorear en tiempo real el estado del bebé y controlar los dispositivos asociados.

## Problemática

El cuidado de un bebé requiere monitoreo constante de condiciones como temperatura, humedad y patrones de sueño. Esto puede ser agotador y propenso a errores humanos. El sistema **Cuna Inteligente** busca automatizar este proceso y centralizar la información en un panel de control accesible desde cualquier dispositivo con conexión a internet.

## Objetivos del Frontend

- Ofrecer una interfaz amigable e intuitiva para visualizar datos recolectados por los sensores.
- Permitir la reproducción de sonidos y control del movimiento de la cuna mediante comandos desde la interfaz.
- Mostrar alertas en tiempo real basadas en el análisis de datos.
- Proporcionar herramientas visuales como gráficos interactivos para entender mejor el entorno del bebé.

## Funcionalidades

1. **Monitoreo en Tiempo Real**:  
   Muestra datos como temperatura, humedad y movimiento del bebé, actualizados constantemente.

2. **Control de Dispositivos**:  
   Permite activar o desactivar el servomotor y reproducir sonidos utilizando el módulo DFPlayer.

3. **Alertas y Notificaciones**:  
   El sistema genera alertas visuales cuando se detectan condiciones fuera de lo normal.

4. **Visualización de Datos**:  
   Utiliza gráficos interactivos para mostrar tendencias y registros históricos de los sensores.

## Requisitos del Sistema

- Node.js 16+
- Navegador moderno (Chrome, Firefox, Edge)

## Instalación y Configuración

```sh
# Clonar el repositorio
git clone https://github.com/usuario/cuna-inteligente-frontend.git

# Navegar al directorio del proyecto
cd cuna-inteligente-frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build
