import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { diskStorage } from 'multer';

const genFilename = (file: any) => {
  return `${uuid()}${extname(file.originalname)}`;
};

const SUB_DIRIECTORIES = ['images'];

// Выдает объект с настройками для Muller
// Subdir - субдиректория
export const genOpts = (subdir: string) => {
  if (!SUB_DIRIECTORIES.includes(subdir)) {
    throw `ВЫ ТАМ ОШАЛЕЛИ?\r\nSub directory "${subdir}" not resolved`;
  }

  return {
    storage: diskStorage({
      destination: `./upload/${subdir}`,
      filename: (req: any, file: any, cb: any) => {
        // Calling the callback passing the random name generated with the original extension name
        cb(null, genFilename(file));
      },
    }),
  };
};
