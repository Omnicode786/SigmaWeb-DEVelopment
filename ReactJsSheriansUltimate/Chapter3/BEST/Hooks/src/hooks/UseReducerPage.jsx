import React, { useReducer } from 'react';
import Bubble from '../components/Bubble';

const reducer = (state, action) => {
  switch(action.type) {
    case 'GROW': return { size: state.size + 20, mood: '😎' };
    case 'SHRINK': return { size: Math.max(50, state.size - 20), mood: '🥺' };
    default: return state;
  }
}

const UseReducerPage = () => {
  const [state, dispatch] = useReducer(reducer, { size: 100, mood: '😐' });

  return (
    <div className="w-full h-full relative flex items-center justify-center bg-orange-50">
      <Bubble 
        title="The Manager" 
        content={`Jab logic complex ho jaye, to useState bachpana lagta hai.
        useReducer aik "Manager" hai.
        
        Aap bas "Order" (dispatch) dete ho: "GROW!".
        Manager khud decide karta hai ke state kaise change hogi.`}
        color="#e17055" x="20%" y="25%" 
      />

      <div className="text-center">
        <div 
          className="bg-orange-400 rounded-full shadow-2xl mx-auto flex items-center justify-center text-4xl transition-all duration-300"
          style={{ width: state.size, height: state.size }}
        >
          {state.mood}
        </div>
        
        <div className="flex gap-4 mt-12">
          <button onClick={() => dispatch({type: 'GROW'})} className="px-8 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700">Grow 📈</button>
          <button onClick={() => dispatch({type: 'SHRINK'})} className="px-8 py-3 bg-white text-slate-800 rounded-xl font-bold hover:bg-gray-100">Shrink 📉</button>
        </div>
      </div>
    </div>
  );
};

export default UseReducerPage;