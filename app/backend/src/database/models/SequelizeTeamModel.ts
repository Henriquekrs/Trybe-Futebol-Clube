import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeMatchesModel from './SequelizeMatchesModel';

class SequelizeTeamModel extends Model<InferAttributes<SequelizeTeamModel>,
InferCreationAttributes<SequelizeTeamModel>> {
  declare id: CreationOptional<number>;

  declare teamName: string;
}

SequelizeTeamModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

SequelizeTeamModel.hasMany(SequelizeMatchesModel, { as: 'homeMatches', foreignKey: 'homeTeamId' });
SequelizeTeamModel.hasMany(SequelizeMatchesModel, { as: 'awayMatches', foreignKey: 'awayTeamId' });

export default SequelizeTeamModel;
