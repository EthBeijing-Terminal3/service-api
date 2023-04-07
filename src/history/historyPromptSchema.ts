import { Model, DataTypes, Sequelize } from 'sequelize';

export class HistoryPromptModel extends Model {
  public id: number;
  public account_address: string;
  public path: string;
  public input: any;
  public output: any;
}

export default (sequelize: Sequelize): typeof HistoryPromptModel => {
  // Init all models
  HistoryPromptModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      account_address: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      path: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      input: {
        allowNull: false,
        type: DataTypes.JSONB,
      },
      output: {
        allowNull: false,
        type: DataTypes.JSONB,
      },
    },
    {
      underscored: true,
      modelName: 'history_prompts',
      sequelize,
      timestamps: true,
    },
  );

  HistoryPromptModel.prototype.toJSON = function () {
    return Object.assign({}, this.get());
  };

  return HistoryPromptModel;
};
