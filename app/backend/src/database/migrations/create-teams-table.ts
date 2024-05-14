import { DataTypes, Model, QueryInterface } from "sequelize";
import { ITeam } from '../../Interfaces/iTeamInterface';

export default {
    up(queryInterface: QueryInterface) {
      return queryInterface.createTable<Model<ITeam>>('teams', {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        teamName: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'team_name',
        },
      })
    },
    doesNotThrow(queryInterface: QueryInterface) {
      return queryInterface.dropTable('teams');
    },
}