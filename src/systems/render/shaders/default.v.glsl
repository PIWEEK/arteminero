#version 300 es

precision mediump float;

in vec3 a_position;
uniform mat4 u_modelViewProjection;

void main() {
  gl_PointSize = 35.0;
  gl_Position = u_modelViewProjection * vec4(a_position, 1.0);
}
