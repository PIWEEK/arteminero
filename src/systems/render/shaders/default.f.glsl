#version 300 es

precision mediump float;

in vec4 v_position;

out vec4 fragColor;

void main() {
  fragColor = vec4(1.0 / v_position.z, 0.0, 1.0 / v_position.z, 1.0);
}
