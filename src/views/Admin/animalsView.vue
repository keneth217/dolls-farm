<template>
     <section class="min-vh-100 text-white bg-dark background">
    <div class="container-fluid text-center">
        <div class="row  justify-content-center p-3">
            <div class="col-md-6   font-weight-bold text-center text-white">
                <h3> AVAILABLE animalS</h3>
            </div>

        </div>
        <div class="row justify-content-center">
            <div class="col">
                <div class="row mt-2 mb-2 justify-content-center">
                    <div class="col-md-6 font-weight-bold  type text-uppercase">
                        <ul class="nav nav-tabs text-danger">
                            <li class="nav-item">
                                <a class="nav-link" @click="changeAnimalType('ALL')">ALL</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" @click="changeAnimalType('cow')">cows</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" @click="changeAnimalType('goat')">goats</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" @click="changeAnimalType('sheep')">sheep</a>
                            </li>
                        </ul>
                    </div>
                    <div class="text-white"> Total Animals:({{ totalAnimals }})</div>
                </div>

            </div>
        </div>
        <hr>
        <div class="col text-center" v-if="loading">
          <div class="d-flex justify-content-center">
            <div class="spinner-border text-warning" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="row justify-content-center">
            <div class="col-md-4 col-sm-12 mb-3 " v-for="(animal, index) in paginatedAnimalData" :key="index">
              <div class="card border-primary" style="width: 20rem; height: 30rem;">
                <img :src="animal.image" class="card-img-top" style="width: 20rem;height: 20rem;" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Type:{{ animal.type }}</h5>
                  <h5 class="card-title">Owner:{{ animal.owner}}</h5>
                  <router-link type="button" class="btn btn-info" :to="`/animal/${animal.id}/${animal.owner}`">View More</router-link>
                </div>
              </div>
            </div>
          </div>
          <div v-if="paginatedAnimalData.length === 0" class="col text-center">
            <p>No Animal data is available.</p>
          </div>
          <hr>
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-end">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" @click="changePage(currentPage - 1)">Previous</a>
              </li>
              <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                <a class="page-link" @click="changePage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" @click="changePage(currentPage + 1)">Next</a>
              </li>
            </ul>
          </nav>
          <hr>
        </div>
   </div>
</section>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import { useAnimalsStore } from '../../stores/animalsStore';

export default {
    setup() {
        const animal_data = ref([]);
        const animalStore = useAnimalsStore();
        const itemsPerPage = 6;
        // const total = animalStore.totalanimals
        const currentPage = ref(1);
        const currentAnimalType = ref('ALL');
        const totalAnimals = computed(() => animalStore.totalAnimals);
        console.log(totalAnimals)
        // Watcher for totalMessages
        watch(totalAnimals, (newValue) => {
            console.log('Total animals changed:', newValue);
        });

        const fetchAnimals = async () => {
            await animalStore.fetchAllAnimals();
            animal_data.value = animalStore.animals;
        };

        const getFilteredAnimalData = () => {
            return currentAnimalType.value === 'ALL'
                ? animal_data.value
                : animal_data.value.filter(animal => {
                    return currentAnimalType.value === 'ALL' || animal.type === currentAnimalType.value;
                });
        };

        const paginatedAnimalData = computed(() => {
            const filteredData = getFilteredAnimalData();
            const startIndex = (currentPage.value - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return filteredData.slice(startIndex, endIndex);
        });

        const totalPages = computed(() => Math.ceil(getFilteredAnimalData().length / itemsPerPage));

        const changePage = (page) => {
            if (page >= 1 && page <= totalPages.value) {
                currentPage.value = page;
            }
        };

        const changeAnimalType = (type) => {
            console.log('Changing animal type to:', type);
            currentAnimalType.value = type;
            currentPage.value = 1;
            fetchAnimals();
        };
//         changeAnimalType(animalType) {
//     console.log('Changing animal type to:', animalType);
//     currentAnimalType.value = animalType;
//     currentPage.value = 1;
//     fetchAnimals();
// }

        onMounted(() => {
            fetchAnimals();
        });

        return {
            animal_data,
            paginatedAnimalData,
            currentPage,
            totalPages,
            changePage,
            changeAnimalType,
            totalAnimals
        };
    },
};
</script>
<style scoped>
.background {

    background: rgb(154, 154, 89);
    width: 100%;
    min-height: 100vh;
    text-align: center;
    display: flex;
    background-attachment: fixed;

    background-position: center;
    background-size: cover;
    opacity: 1;
}

.type {
    color: black;
}
</style>