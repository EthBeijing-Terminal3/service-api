import { DataTypes, QueryInterface, Sequelize } from 'sequelize';
import { Migration } from '../umzug';

export const up: Migration = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.createTable('history_prompts', {
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
      defaultValue: {},
    },
    output: {
      allowNull: false,
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
  });
}

export const down: Migration = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.dropTable('history_prompts');
};
