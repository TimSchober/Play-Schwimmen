function runDemo(webGLContext, vertexShaderText, fragmentShaderText) {
  // "const" is loosely the same as "var", but newer and better.
  const vs = webGLContext.createShader(webGLContext.VERTEX_SHADER);
  webGLContext.shaderSource(vs, vertexShaderText);
  // ... so on, like in the videos
}
loadShadersAndRunDemo();

// Method 1: Async/Await
// By far the cleanest to read, but requires new-ish JavaScript features
//  that aren't super common yet.
// Notice "async" before "function" - this marks the function as an
//  asynchronous function, meaning that it will return a Promise.
// Read up on promises here if you aren't familiar:
// https://developers.google.com/web/fundamentals/primers/promises
async function loadShadersAndRunDemo() {
  // "fetch" makes an HTTP request to the given address, then returns
  //  a Result object that can be parsed as text, json, or binary.
  // We want the text result!
  // "await" says "wait for the fetch call to finish before setting
  //  the variable and continuing execution"
  const vertexShaderText = await fetch('vertexshader.glsl')
    .then(result => result.text());
  const fragmentShaderText = await fetch('fragmentshader.glsl')
    .then(result => result.text());
  runDemo(vertexShaderText, fragmentShaderText);
}