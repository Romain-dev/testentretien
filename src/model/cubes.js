import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Cubes = new Mongo.Collection('cubes');

Meteor.methods({
  'cubes.clear'() {
    if(!this.isSimulation) {
        return Cubes.removeAsync({});
    }
  }
});