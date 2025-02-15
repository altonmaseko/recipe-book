import { Recipe, useStore } from "./store/useStore";

import { useEffect, useState } from "react";

const App = () => {

  let { recipes, addRecipe, removeRecipe } = useStore()

  let [name, setName] = useState<string>('');
  let [ingredientsString, setIngredientsString] = useState<string>('');
  let [ingredients, setIngredients] = useState<string[]>([]);
  let [instructions, setInstructions] = useState<string>('');

  useEffect(() => {
    setIngredients(ingredientsString.split(',').map(i => i.trim()))
  }, [ingredientsString])

  const handleAddRecipe = () => {
    if (!name.trim() || !ingredientsString.trim() || !instructions.trim()) return

    let recipe: Recipe = {
      id: Date.now(),
      ingredients: ingredients,
      instructions: instructions,
      name: name
    }
    addRecipe(recipe)

    setIngredientsString('')
    setName('')
    setInstructions('')
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4 bg-white text-black items-center p-8 rounded-lg min-w-[400px]">
        <h1>Recipe Book</h1>
        <input placeholder="Recipe name" className="p-2 border-2 border-gray-400 rounded-lg w-full" type="text" value={name} onChange={(e) => setName(e.currentTarget.value)} />
        <input placeholder="Recipe ingredients, comma separated" className="p-2 border-2 border-gray-400 rounded-lg w-full" type="text" value={ingredientsString} onChange={(e) => setIngredientsString(e.currentTarget.value)} />
        <input placeholder="Recipe intructions" className="p-2 border-2 border-gray-400 rounded-lg w-full" type="text" value={instructions} onChange={(e) => setInstructions(e.currentTarget.value)} />

        <button onClick={handleAddRecipe} className="px-4 py-2 bg-green-500 rounded-md font-bold border-[1px] border-black hover:scale-105 active:scale-95">Add Recipe</button>
      </div>
      {recipes.map(({ name, instructions, ingredients, id }, i) => (
        <div key={i} className="bg-teal-300 rounded-md flex flex-col gap-4 p-4 max-w-[600px] text-black">
          <h1>{name}</h1>
          <p> <b>Ingredients:</b> {ingredients?.map((value, i) => <span key={i} className="px-2 py-1 rounded-full bg-purple-500">{value}</span>)} </p>
          <h2>Instructions</h2>
          <p>{instructions}</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-yellow-300 rounded-md font-bold border-[1px] border-black hover:scale-105 active:scale-95">Edit</button>
            <button onClick={() => removeRecipe(id!)} className="px-4 py-2 bg-red-500 rounded-md font-bold border-[1px] border-black hover:scale-105 active:scale-95">Delete</button>
          </div>
        </div>))}
    </div>



  )
}

export default App