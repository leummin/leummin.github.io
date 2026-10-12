# Modelo local de Vosk

`vosk-model-small-es-0.42.tar.gz` es el modelo pequeño de español de Alpha Cephei
(Apache-2.0). Vive en este directorio para que el worker lo pida al mismo origen
(`/vosk/vosk-model-small-es-0.42.tar.gz`). No hay fetch a un CDN.

- Zip de origen: 39 817 833 bytes.
- Este tar.gz: 39 749 782 bytes.
- El WASM no está aquí: va dentro de la dependencia npm `vosk-browser` 0.0.8
  (5 817 459 bytes desempaquetados) y solo lo importa el worker.
