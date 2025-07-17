import { BlockSide } from './BlockSide.js'
import { IndexedGeometry } from './IndexedGeometry.js'

export class BlockBuilder {
  static buildTop(x, y, z, sx = 0.5, sy = -0.5, sz = 0.5) {
    const vertices = [
      x - sx, y + sy, z - sz,
      x - sx, y + sy, z + sz,
      x + sx, y + sy, z - sz,
      x + sx, y + sy, z + sz,
    ]

    const indices = [
      0, 1, 2,
      1, 3, 2
    ]

    return new IndexedGeometry(vertices, indices)
  }

  static buildBottom(x, y, z, sx = 0.5, sy = +0.5, sz = 0.5) {
    const vertices = [
      x - sx, y + sy, z - sz,
      x - sx, y + sy, z + sz,
      x + sx, y + sy, z - sz,
      x + sx, y + sy, z + sz,
    ]

    const indices = [
      0, 1, 2,
      1, 3, 2
    ]

    return new IndexedGeometry(vertices, indices)
  }

  static buildLeft(x, y, z) {

  }

  static buildRight(x, y, z) {

  }

  static buildFront(x, y, z) {

  }

  static buildBack(x, y, z) {

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
