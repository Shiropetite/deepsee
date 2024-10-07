import api from '../axios';

export const getAllJobOffers = async (): Promise<any[]> => {
    const response = await api.get('/job-offers');
    return response.data;
};
