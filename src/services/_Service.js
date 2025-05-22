import { boardModel } from '@/models/_Model'
import { slugify } from '@/utils/formatters'

const createNew = async (reqBody) => {
  try {
    // Xử lý logic dữ liệu
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    }

    //Gọi tới Model để lưu vào DB
    const createdBoard = await boardModel.createNew(newBoard)

    //Lấy bảng ghi mới
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    // Trả kết qua sau khi xử lý
    return getNewBoard
  } catch (error) {
    throw error
  }
}

export const _Service = {
  createNew,
}
