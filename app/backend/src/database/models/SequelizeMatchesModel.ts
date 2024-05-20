import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeTeamModel from './SequelizeTeamModel';

class SequelizeMatchesModel extends Model<InferAttributes<SequelizeMatchesModel>,
InferCreationAttributes<SequelizeMatchesModel>> {
  declare id: CreationOptional<number>;

  declare homeTeamId: number;

  declare homeTeamGoals: number;

  declare awayTeamId: number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;

  declare homeTeam?: SequelizeTeamModel;

  declare awayTeam?: SequelizeTeamModel;
}

SequelizeMatchesModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
    references: {
      model: SequelizeTeamModel,
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
    references: {
      model: SequelizeTeamModel,
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeMatchesModel.belongsTo(SequelizeTeamModel, { as: 'homeTeam', foreignKey: 'homeTeamId' });
SequelizeMatchesModel.belongsTo(SequelizeTeamModel, { as: 'awayTeam', foreignKey: 'awayTeamId' });

SequelizeTeamModel.hasMany(SequelizeMatchesModel, { as: 'homeMatches', foreignKey: 'homeTeamId' });
SequelizeTeamModel.hasMany(SequelizeMatchesModel, { as: 'awayMatches', foreignKey: 'awayTeamId' });

export default SequelizeMatchesModel;
