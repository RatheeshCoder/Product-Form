import axios from 'axios';

export const createEndUserTicket = async (ticketData, apiKeys) => {
    try {
        const response = await axios.post(
            `http://localhost:5002/api/v1/userQuery/end-user-ticket`,
            ticketData,
            {
                headers: {
                    'X-Public-Key': apiKeys.publicKey,
                    'X-Private-Key': apiKeys.privateKey
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating ticket:", error);
        return { 
            success: false, 
            message: error.response?.data?.message || 'Failed to create ticket' 
        };
    }
};