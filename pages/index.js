// 1. a H1 with the text "Find Nutrition Facts for any recipe"
// 2. a text area for users to upload recipe
// 3. a button for users to submit the entered recipe
// 4. a section at the bottom to display nutrition facts
// 5. Get the data from this link: http://localhost:8080/openai/generateinfo
// 6. Name the component RecipeInfo

// 1. a H1 with the text "Find Nutrition Facts for any recipe"
// 2. a text area for users to upload recipe
// 3. a button for users to submit the entered recipe
// 4. a section at the bottom to display nutrition facts
// 5. Get the data from this link: http://localhost:8080/openai/generateinfo
// 6. Name the component RecipeInfo
import { useState } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { getSession } from 'next-auth/client';
import { getAccessToken } from 'next-auth/jwt';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useSession } from 'next-auth/client';
import { useQueryClient } from 'react-query';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';
import { getSession } from 'next-auth/client';
import { getAccessToken } from 'next-auth/jwt';
import { useRouter } from 'next/router';


const RecipeInfo = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [recipe, setRecipe] = useState('');

  const mutation = useMutation(
    async (recipe) => {
      const response = await axios.post('/api/generateInfo', {
        recipe,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData('recipeInfo', data);
        router.push('/recipeInfo');
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(recipe);
  };

  if (loading) return null;

  if (!loading && !session) {
    router.push('/');
  }

  return (
    <div className="container">
      <h1 className="title">Find Nutrition Facts for any recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="recipe">Recipe</label>
          <textarea
            className="form-control"
            id="recipe"
            rows="3"
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <style jsx>{`
        .container {
          padding: 2rem;
        }
        .title {
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );

}