from django.urls import path
from .views import (
    RegisterUserview,
    LoginUserView,
    CreateRecipe,
    listAllRecipe,
    RecipeDetailView,
    SearchRecipeView,
    FilterRecipesByIngredientsView,
)

urlpatterns = [
    path("register/", RegisterUserview.as_view(), name="register"),
    path("login/", LoginUserView.as_view(), name="login"),
    path("createrecipe/", CreateRecipe.as_view(), name="create_recipe"),
    path("recipe/", listAllRecipe.as_view(), name="list_all_recipes"),
    path("recipe/<int:pk>/", RecipeDetailView.as_view(), name="recipe_by_id"),
    path("search-recipe/", SearchRecipeView.as_view(), name="search_recipe"),
    path("filter-recipes-by-ingredients/", FilterRecipesByIngredientsView.as_view(), name="filter_recipes_by_ingredients"),
]
