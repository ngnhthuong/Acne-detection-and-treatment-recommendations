export const getAcneTreatment = (user_id) => ({
    url: `acne_treatments/`,
    method: 'GET',
    params: {
        user_id,
    },
  });