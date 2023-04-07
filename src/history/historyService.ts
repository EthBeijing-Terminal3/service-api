import db from "../db";


export const addToHistory = async (path, accountAddress: string, input: any, output: any) => {
  return db.HistoryPrompt.create({
    account_address: accountAddress,
    path,
    input,
    output,
  });
};

export const getHistory = async (accountAddress: string, limit: number, offset: number) => {
  const data = await db.HistoryPrompt.findAll({
    where: {
      account_address: accountAddress,
    },
    order: [
      ["created_at", "DESC"],
    ],
    limit,
    offset,
  });

  return data.map((item) => item.toJSON());
};
