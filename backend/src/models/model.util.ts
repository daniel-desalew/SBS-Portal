import { model, models, type Model, type Schema } from 'mongoose';

export const getModel = <DocumentType>(
  name: string,
  schema: Schema<DocumentType>,
): Model<DocumentType> => {
  const existing = models[name] as Model<DocumentType> | undefined;
  return existing ?? model<DocumentType>(name, schema);
};
