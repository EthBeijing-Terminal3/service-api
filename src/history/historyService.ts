import db from "../db";


export const addToHistory = async (path, accountAddress: string, input: any, output: any) => {
  return db.HistoryPrompt.create({
    account_address: accountAddress,
    path,
    input,
    output,
  });
};

export const getHistory = async (accountAddress: string, path: string, limit: number, offset: number) => {
  let query: any = {account_address: accountAddress};

  if (path) {
    query = { ...query, path };
  }

  const data = await db.HistoryPrompt.findAll({
    where: query,
    order: [
      ["created_at", "DESC"],
    ],
    limit,
    offset,
  });

  return data.map((item) => item.toJSON());
};
