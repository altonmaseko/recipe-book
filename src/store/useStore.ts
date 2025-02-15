import { create } from "zustand";

type Recipe = {
  id?: number,
  name?: string,
  ingredients?: string[],
  instructions?: string
}

type RecipeStore = {
  recipes: Recipe[],
  addRecipe: (recipe: Recipe) => void,
  removeRecipe: (id: number) => void
}

const useStore = create<RecipeStore>((set) => ({
  recipes: [],
  addRecipe: (recipe) => set((state) => ({ recipes: [...state.recipes, recipe] })),
  removeRecipe: (id) => set((state) => ({ recipes: state.recipes.filter(recipe => recipe.id !== id) }))
}))

export { useStore, type Recipe }