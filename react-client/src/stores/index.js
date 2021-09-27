import create from 'zustand';
import jwt from 'jsonwebtoken'

export const useAuthStore = create(set => ({
    user: (()=>{
        const token = localStorage.getItem('token');
      if(token === undefined){
        return null;
      }
      const user = jwt.decode(token);
      return user;
    })(),
    setUser: (user) => {
        set((state)=>{
            return {...state, user:user}
        });
    }
})); 