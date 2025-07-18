import { BlockChunkComponent } from '../../components/BlockChunkComponent';
import { BlockBuilder } from './BlockBuilder';
import { IndexedGeometry } from './IndexedGeometry';

export class BlockChunkBuilder {
  static getOffset(y, x, z) {
    return y * BlockChunkComponent.X_SIZE * BlockChunkComponent.Z_SIZE + x * BlockChunkComponent.Z_SIZE + z
  }

  // TODO: Necesitamos saber cuáles son los blockChunkComponents
  //       adyacentes para cuando nos encontramos en los límites
  //       de un chunk (x o z).
  static build(blockChunkComponent) {
    const indexedGeometry = new IndexedGeometry()
    for (let y = 0; y < BlockChunkComponent.Y_SIZE; y++) {
      for (let x = 0; x < BlockChunkComponent.X_SIZE; x++) {
        for (let z = 0; z < BlockChunkComponent.Z_SIZE; z++) {
          const currentBlock = blockChunkComponent.data[this.getOffset(y, x, z)]
          if (currentBlock === 0) {
            continue
          }

          const topBlock = blockChunkComponent.data[this.getOffset(y - 1, x, z)]
          if (y !== 0 && topBlock === 0) {
            const currentIndexedGeometry = BlockBuilder.buildTop(x, y, z)
            indexedGeometry.append(currentIndexedGeometry)
          }
          const bottomBlock =
            blockChunkComponent.data[this.getOffset(y + 1, x, z)]
          if (y !== BlockChunkComponent.Y_SIZE - 1 && bottomBlock === 0) {
            const currentIndexedGeometry = BlockBuilder.buildBottom(x, y, z)
            indexedGeometry.append(currentIndexedGeometry)
          }

          const leftBlock =
            blockChunkComponent.data[this.getOffset(y, x - 1, z)]
          if (x !== 0 && leftBlock === 0) {
            const currentIndexedGeometry = BlockBuilder.buildLeft(x, y, z)
            indexedGeometry.append(currentIndexedGeometry)
          }
          const rightBlock =
            blockChunkComponent.data[this.getOffset(y, x + 1, z)]
          if (x !== BlockChunkComponent.X_SIZE - 1 && rightBlock === 0) {
            const currentIndexedGeometry = BlockBuilder.buildRight(x, y, z)
            indexedGeometry.append(currentIndexedGeometry)
          }

          const frontBlock =
            blockChunkComponent.data[this.getOffset(y, x, z - 1)]
          if (z !== 0 && frontBlock === 0) {
            const currentIndexedGeometry = BlockBuilder.buildFront(x, y, z)
            indexedGeometry.append(currentIndexedGeometry)
          }
          const backBlock =
            blockChunkComponent.data[this.getOffset(y, x, z + 1)]
          if (z !== blockChunkComponent.Z_SIZE - 1 && backBlock === 0) {
            const currentIndexedGeometry = BlockBuilder.buildBack(x, y, z)
            indexedGeometry.append(currentIndexedGeometry)
          }
        }
      }
    }
    return indexedGeometry
  }
}
