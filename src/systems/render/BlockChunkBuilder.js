import { BlockChunkComponent } from '../../components/BlockChunkComponent';
import { BlockBuilder } from './BlockBuilder';
import { IndexedGeometry } from './IndexedGeometry';

export class BlockChunkBuilder {
  static getOffset(y, x, z) {
    return y * BlockChunkComponent.X_SIZE * BlockChunkComponent.Z_SIZE + x * BlockChunkComponent.Z_SIZE + z
  }

  static build(blockChunkComponent) {
    const indexedGeometry = new IndexedGeometry()
    for (let y = 0; y < BlockChunkComponent.Y_SIZE; y++) {
      for (let x = 0; x < BlockChunkComponent.X_SIZE; x++) {
        for (let z = 0; z < BlockChunkComponent.Z_SIZE; z++) {
          const currentBlock = blockChunkComponent.data[this.getOffset(y, x, z)]
          if (currentBlock !== 0) {
            if (y > 0) {
              const topBlock = blockChunkComponent.data[this.getOffset(y - 1, x, z)]
              if (topBlock === 0) {
                const currentIndexedGeometry = BlockBuilder.buildTop(x, y, z)
                indexedGeometry.append(currentIndexedGeometry)
              }
            } else {
              const currentIndexedGeometry = BlockBuilder.buildTop(x, y, z)
              indexedGeometry.append(currentIndexedGeometry)
            }
          }
        }
      }
    }
    return indexedGeometry
  }
}
