#version 300 es

precision mediump float;

in vec4 v_position;

out vec4 fragColor;

uniform vec3 u_color;

void main() {
  fragColor = vec4(2.0 / v_position.z * u_color.x, u_color.y, 2.0 / v_position.z * u_color.z, 1.0);
}
