# Guia Visual AeroCalma

## Estilo general

- Low-poly realista (no caricatura infantil, no hiperrealismo).
- Inspirado en la claridad espacial de juegos 3D clasicos (mundo caminable, lectura espacial simple), sin copiar assets, nombres o marcas de ningun juego.
- Aplicado a contexto de aeropuerto: funcional, calido, terapeutico.
- Materiales opacos, sin brillos excesivos.
- Colores sobrios y armoniosos.
- Buenos niveles de luz ambiental para lectura espacial clara.

## Paleta cromatica

Variable | Color | Uso
--------|-------|-----
--sky | #c8e6f5 | Cielo y fondo exterior
--deep | #1a2e42 | Fondo UI, profundidad
--mid | #2c4a63 | Superficies intermedias
--accent | #5ba4d4 | Acentos, botones, zonas activas
--accent2 | #4ecdc4 | Acento secundario, feedback positivo
--warm | #f7c59f | Toques calidos, iluminacion suave
--green | #52b788 | Indicadores de calma
--text | #1a2e42 | Texto principal
--text-light | #607d9b | Texto secundario
--surface | rgba(255,255,255,0.92) | Fondo de paneles
--glass | rgba(255,255,255,0.12) | Efecto vidrio en overlays

## Materiales (Three.js)

- **Piso**: gris claro, roughness alto (0.8-0.9), metalness bajo (0.0). Acabado ligeramente mojado.
- **Paredes**: tono gris-azulado (variacion de --mid), rugosidad media, sin specular fuerte.
- **Mostradores**: madera clara, roughness medio, superficie opaca.
- **Columnas**: gris acero oscuro, roughness 0.5, metalness 0.3.
- **Señalética**: fondo blanco o claro, texto oscuro, superficie laminada (MeshLambertMaterial).
- **Carteles**: fondo claro, texto oscuro, borde sutil.
- **Ventanas**: vidrio semitransparente, azul pálido, reflexiones sutiles.
- **Asientos**: tela medio gris, roughness alto, sin metal visible.
- **Aviones**: fuselaje blanco/gris claro, acentos sutiles. Sin marcas reales.

## Iluminación

- Luz ambiental moderada (0.28 intensidad base) — el ciclo sutil de ±0.03 da vida al espacio.
- Luz direccional suave desde arriba (simula luz de techo de hall).
- Sin sombras excesivamente duras — PCFSoftShadowMap si se usan sombras.
- Iluminación cálida en zonas interiores (check-in, salas).
- Iluminación exterior azulada (cielo despejado).
- Sin luces estroboscópicas ni efectos agresivos.
- En modo calma: luces más tenues, contraste reducido.

## Estilo de NPCs

- Siluetas simples tipo stick-figure o humanoid low-poly (20-30 triángulos).
- Sin caras detalladas — usar formas básicas sin expresiones inquietantes.
- Variantes:
  - Persona de pie (estática)
  - Persona caminando lentamente (movimiento suave)
  - Persona con maleta
  - Empleado detrás de mostrador
  - Personal de seguridad uniformado (simple)
  - Tripulación de cabina (modelo GLTF simple)
- En modo calma: NPCs civiles se ocultan, solo quedan empleados y personal de seguridad.
- Movimientos suaves, nunca bruscos.
- Sin multitudes — 3-5 NPCs visibles a la vez en desktop.
- Sin animaciones que generen inquietud.

## Estilo del Hall

- Hall amplio y central con circulación clara.
- Suelo de mosaico gris claro, patrón simple y geométrico.
- Techo alto con estructura de vigas vista (low-poly).
- Columnas cada 8-10 metros para lectura espacial clara.
- Paredes laterales con ventanales altos (luz natural).
- Señalización direccional en colores del aeropuerto (azul, blanco).
- Carteles de vuelos (flight board) funcional.
- Mostradores de check-in alineados y reconocibles.
- Bancos y zonas de espera discretas.
- 6 tiendas con fachadas distintas:
  - Cafetería (color cálido)
  - Kiosco (color neutro)
  - Librería (color verde)
  - Farmacia (color blanco/azul)
  - Restaurante (color terracota)
  - Regalos (color dorado/blanco)

## Estilo de la plataforma exterior

- Vista visible desde ventanales del hall.
- Pista/textura de asfalto gris oscuro.
- Aviones estáticos en plataforma (sin marcas reales).
- Manga de embarque simple.
- Luces de pista suaves (blancas/amarillas).
- Vehículos de plataforma simplificados (vehículo de combustible, equipaje).
- Cielo con gradiente azul-claro a blanco (Three.Sky).
- En modo calma: aviones estáticos, menos luces.

## Nivel gráfico definido

- **Low-poly realista**: entre 500 y 2000 triángulos por estructura principal.
- **No caricatura infantil**: evita proporciones exageradas o colores saturados.
- **No hiperrealismo**: no busca fotorealismo; prioriza claridad y rendimiento.
- **Buena lectura espacial**: formas geométricas claras, bordes definidos, poca oclusión ambiental.
- **Color paleta limitada**: máximo 5-7 colores distintos por zona, manteniendo coherencia全局.
- **Texturas canvas-procedurales**: generadas en tiempo de ejecución para señales, carteles y flight board.

## Señalética y cartelería

- Fuente sans-serif limpia (DM Sans del proyecto).
- Colores del aeropuerto: azul (#4a9eff), blanco, gris oscuro.
- Códigos de colores por zona para lectura rápida:
  - Entrada: azul
  - Check-in: púrpura
  - Seguridad: ámbar
  - Sala de espera: verde
  - Embarque: rojo
  - Vuelo: índice/azul oscuro
  - Llegada: naranja

## Reglas terapéuticas de diseño visual

1. Nunca usar colores saturados o neón como elementos principales.
2. Nunca usar animaciones bruscas o inesperadas.
3. Mantener siempre una opción de modo calma (menos estimulación).
4. La experiencia visual debe transmitir seguridad y orden.
5. Evitar altibajos de luz dramáticos o cambios bruscos de escena.
6. El ambiente sonoro y visual deben ser coherentes y predecibles.
7. El recorrido debe sentirse como un paseo tranquilo, no una aventura de acción.

## Notas sobre licencias

- No usar modelos 3D, texturas o assets de juegos comerciales (GTA, etc.).
- Todos los modelos y texturas deben ser creados originalmente o de fuentes libres.
- No usar marcas reales de aerolíneas, aeropuertos o productos.
- Nombres de tiendas son ficticios (Café Aduana, Kiosco Sky, etc.).