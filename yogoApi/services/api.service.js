
const axios = require('axios');

class ApiService {
    constructor() {
      this.api = axios.create({
        baseURL: 'https://yoga-api-nzy4.onrender.com/v1'
      });
    }
   
    getAllPoses = () => {
      return this.api.get('/poses');
    };
   
    getPoseCluster = (postName) => {
      return this.api.get(`/categories?name=${poseName}`);
    }

    getOnePose = (poseId) => {
        return this.api.get(`/poses/${postId}`);
      }
      //https://yoga-api-nzy4.onrender.com/v1/poses?name=butterflyv
   
    createCharacter = (characterInfo) => {
      return this.api.post(`/characters`, characterInfo);
    }
   
    editCharacter = (characterId, characterInfo) => {
      return this.api.put(`/characters/${characterId}`, characterInfo);
    }
   
    deleteCharacter = (characterId) => {
      return this.api.delete(`/characters/${characterId}`);
    }
    
  }
   
  module.exports = ApiService;