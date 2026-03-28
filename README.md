# Botero Museum App: Rediseñando la Interacción con el Arte 🎨 colombia

## 📖 Case Study: Una Experiencia Editorial e Inmersiva

Este proyecto nace de la necesidad de transformar la visita al **Museo Botero** de una actividad contemplativa pasiva a una experiencia interactiva de alta fidelidad. A continuación, detallo el proceso de diseño, los flujos lógicos y la arquitectura de la Inteligencia Artificial que dan vida a esta aplicación.

---

## 🛠 Proceso de UX: Los Flujos de Navegación (Flowcharts)

Para este desarrollo, nos basamos en dos flujos críticos (Flow 01 y Flow 02) que definen la "Experiencia ante la Obra":

### 1. El Camino del Descubrimiento (Flow 01)
Este flujo mapea el viaje del usuario desde que entra al Patio Central hasta que llega frente a una obra.
*   **Sincronización de Posición (SYS01):** Implementamos un sistema que vincula la ubicación física del usuario con el plano 2D isométrico, eliminando la desorientación inicial.
*   **Generación de Trazado (SYS02):** La app no solo muestra un punto, traza una ruta dinámica hacia la obra elegida (ej. *La Mona Lisa*).
*   **Gestión de Desvíos y Feedback (SYS03/PO5):** Una de las grandes mejoras de UX fue la detección de desvíos. Si el usuario se aleja más de 3m de la ruta, la app no genera un error, sino un **Model Feedback** amable que le permite recalcular o explorar libremente, manteniendo el control siempre en sus manos.

### 2. El Diálogo con el Maestro (Flow 02)
Centrado en la interacción profunda una vez que el usuario está frente al cuadro utilizando Realidad Aumentada e IA.
*   **Hotspots de Cristal:** Basado en el flujo de interacción AR, creamos puntos de interés que flotan sobre la obra física, permitiendo un escaneo no intrusivo.
*   **Respuesta Multimodal:** La transición entre ver la ficha técnica y "preguntar a la IA" se diseñó para ser instantánea, utilizando *sheets* deslizables que no rompen el contexto visual de la obra.

---

## 🤖 El Ecosistema de IA: Pantallas y Módulos

La Inteligencia Artificial no es una función aislada, sino un hilo conductor que atraviesa toda la interfaz:

### A. OmniBar (Buscador Inteligente)
Ubicada en el Home, es la puerta de entrada al conocimiento.
*   **Módulo de Voz:** Utiliza un procesador de lenguaje natural (NLP) para entender peticiones abiertas como *"Llévame a ver las esculturas de bronce"*.
*   **Micro-interacción de Red:** Implementamos un sistema de **Shake-Feedback**. Si el usuario intenta usar la IA sin red, el botón del micro "vibra" visualmente y un Toast con estética ámbar (`📡`) le redirecciona al uso del Numpad local.

### B. PreguntarIASheet (El Puente)
Una interfaz de tipo *Glassmorphism* que aparece sobre la obra.
*   **Selector de Modo:** Permite elegir entre una pregunta personalizada o "Preguntas Sugeridas" curadas.
*   **Indicador de Estado:** Un punto de luz (`LiveDot`) que pulsa en verde si la IA está en la nube, o en naranja si estamos usando los datos locales (Modo Offline).

### C. Live Voice & Audio Streaming
La pantalla más inmersiva del sistema.
*   **Waveform Dinámico:** Mientras la IA genera la respuesta, una onda de audio en el rojo institucional del museo (`brandPrimary`) fluctúa en tiempo real, dando la sensación de una conversación viva.
*   **Respuesta Estructural:** La IA no solo habla; entrega una tarjeta con la "Respuesta del Maestro", detallando técnica, curiosidades y contexto histórico de forma estructurada.

---

## 📡 Estrategia Offline-First (Graceful Degradation)

Debido a que los museos suelen tener muros de piedra que bloquean la señal, la aplicación incluye una lógica de respaldo robusta:
1.  **Detección de Red:** Al perder señal, la app autodetecta el estado y cambia a **"Modo Local"**.
2.  **FAQ de Emergencia:** Se desactivan las preguntas abiertas y se activan botones táctiles con los datos más relevantes de la obra (estilo, técnica e historia) que ya viven dentro del código de la app.
3.  **Haptic/Visual Alerts:** El usuario siempre sabe por qué algo cambió, gracias a una jerarquía de colores clara (Verde = Cloud / Ámbar = Local).

---

## 🎨 Estética Editorial Premium

Todo el proyecto se rige por una guía de estilo que honra la **monumentalidad** de Botero:
*   **Tipografía:** *Playfair Display* para títulos (elegancia clásica) y *DM Sans* para lectura (modernidad técnica).
*   **Layout Bento:** Grillas asimétricas que permiten que obras icónicas como la *Mona Lisa* respiren y dominen el espacio visual.
*   **Transiciones:** Animaciones `fadeSlideUp` y `sheet-snap` que hacen que la navegación se sienta ligera y orgánica, como pasar las páginas de un libro de arte de lujo.

---
*Estatus del Proyecto: Fase de Refinamiento 1.2 Completada - Arte, Tecnología y Usabilidad en perfecta armonía.* 🎨Colombia 🇨🇴 
**Desarrollado para el Museo Botero - ivanse22**
