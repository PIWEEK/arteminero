import { BlockSide } from './BlockSide.js'
import { IndexedGeometry } from './IndexedGeometry.js'

export class BlockBuilder {
  static buildX(x, y, z, sx = 0.5, sy = 0.5, sz = 0.5, flipped) {
    const vertices = [
      x + sx, y + sy, z - sz,
      x + sx, y - sy, z - sz,
      x + sx, y + sy, z + sz,
      x + sx, y - sy, z + sz,
    ]

    const indices = flipped ? [
      1, 0, 3,
      0, 2, 3
    ] : [
      0, 1, 2,
      1, 3, 2
    ]

    return new IndexedGeometry(vertices, indices)
  }

  static buildY(x, y, z, sx = 0.5, sy = 0.5, sz = 0.5, flipped) {
    const vertices = [
      x - sx, y + sy, z - sz,
      x - sx, y + sy, z + sz,
      x + sx, y + sy, z - sz,
      x + sx, y + sy, z + sz,
    ]

    const indices = flipped ? [
      1, 0, 3,
      0, 2, 3
    ] : [
      0, 1, 2,
      1, 3, 2
    ]

    return new IndexedGeometry(vertices, indices)
  }

  static buildZ(x, y, z, sx = 0.5, sy = 0.5, sz = 0.5, flipped) {
    const vertices = [
      x - sx, y + sy, z + sz,
      x - sx, y - sy, z + sz,
      x + sx, y + sy, z + sz,
      x + sx, y - sy, z + sz,
    ]

    const indices = flipped ? [
      1, 0, 3,
      0, 2, 3
    ] : [
      0, 1, 2,
      1, 3, 2
    ]

    return new IndexedGeometry(vertices, indices)
  }

  static buildTop(x, y, z, sx = 0.5, sy = -0.5, sz = 0.5) {
    return this.buildY(x, y, z, sx, sy, sz, false)
  }

  static buildBottom(x, y, z, sx = 0.5, sy = +0.5, sz = 0.5) {
    return this.buildY(x, y, z, sx, sy, sz, true)
  }

  static buildLeft(x, y, z, sx = -0.5, sy = 0.5, sz = 0.5) {
    return this.buildX(x, y, z, sx, sy, sz, false)
  }

  static buildRight(x, y, z, sx = +0.5, sy = 0.5, sz = 0.5) {
    return this.buildX(x, y, z, sx, sy, sz, true)
  }

  static buildFront(x, y, z, sx = 0.5, sy = 0.5, sz = -0.5) {
    return this.buildZ(x, y, z, sx, sy, sz, false)
  }

  static buildBack(x, y, z, sx = 0.5, sy = 0.5, sz = +0.5) {
    return this.buildZ(x, y, z, sx, sy, sz, true)
  }

  static build(side, x, y, z) {
    switch (side) {
      case BlockSide.TOP:    return this.buildTop(x, y, z)
      case BlockSide.BOTTOM: return this.buildBottom(x, y, z)
      case BlockSide.LEFT:   return this.buildLeft(x, y, z)
      case BlockSide.RIGHT:  return this.buildRight(x, y, z)
      case BlockSide.FRONT:  return this.buildFront(x, y, z)
      case BlockSide.BACK:   return this.buildBack(x, y, z)
    }
  }
}
