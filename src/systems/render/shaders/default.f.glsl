#version 300 es

precision mediump float;

in vec4 v_position;

out vec4 fragColor;

uniform vec3 u_color;

float from(float value, float fmin, float fmax) {
  return (value - fmin) / (fmax - fmin);
}

void main() {
  float iz = from(v_position.z, 32.0, 1.0);
  fragColor = vec4(iz * u_color.x, iz * u_color.y, iz * u_color.z, 1.0);
}
