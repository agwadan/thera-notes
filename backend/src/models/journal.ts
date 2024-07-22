import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from '../config/sequelize';

interface JournalAttributes{
id: number;
title: string;
content: string;
category: string;
date: Date;
userId: string;
}

interface JournalCreationAttributes extends Optional<JournalAttributes, "id">{}

class Journal extends Model<JournalAttributes, JournalCreationAttributes>
implements JournalAttributes{
  public id!: number;
  public title!: string;
  public content!: string;
  public category!: string;
  public date!: Date;
  public userId!: string;
}

Journal.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    content: {
      type: new DataTypes.STRING(1024),
      allowNull: false,
    },
    category: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    sequelize, 
    modelName: 'Journal',
    tableName: "journals",
  }
);

export default Journal;