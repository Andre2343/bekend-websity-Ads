const adFactory = () => ({

});

const createAds = (n = 10) => {
  return [...(new Array(n))].map(adFactory);
}

const ads = [{

}];


const mocks = {
  Query: {
    ads: () => {
      // return createAds(10);
      return ads;
    },
    // categories: () => {
    //   return categoroes;
    // }
  },
}

export default mocks;