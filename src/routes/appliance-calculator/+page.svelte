<script lang="ts">
  import { commonAppliances, calculateApplianceUsage, estimateMonthlyCost } from '$lib/utils/appliances';
  import type { Appliance } from '$lib/utils/appliances';
  import { fade, fly, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { writable } from 'svelte/store';

  let selectedAppliances: Appliance[] = [];
  let customAppliance: Appliance = { name: '', avgWattage: 0, dailyUseHours: 0 };
  let electricityRate = writable(0.021);

  function addCustomAppliance() {
      if (customAppliance.name && customAppliance.avgWattage > 0 && customAppliance.dailyUseHours > 0) {
          selectedAppliances = [...selectedAppliances, { ...customAppliance }];
          customAppliance = { name: '', avgWattage: 0, dailyUseHours: 0 };
      }
  }

  function removeAppliance(index: number) {
      selectedAppliances = selectedAppliances.filter((_, i) => i !== index);
  }

  $: totalMonthlyUsage = selectedAppliances.reduce((total, appliance) => 
      total + calculateApplianceUsage(appliance.avgWattage, appliance.dailyUseHours), 0
  );

  $: estimatedMonthlyCost = estimateMonthlyCost(totalMonthlyUsage, $electricityRate);

  const applianceIcons = {
      'ثلاجة': '🧊',
      'مكيف هواء': '❄️',
      'تلفاز': '📺',
      'غسالة ملابس': '🧺',
      'سخان ماء': '🚿',
      // أضف المزيد من الأيقونات حسب الحاجة
  };
</script>

<svelte:head>
  <title>PowerCalc - حاسبة استهلاك الأجهزة</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6" dir="rtl">
  <div class="max-w-7xl mx-auto">
      <h1 class="text-5xl font-bold text-center mb-12 text-indigo-900" in:fade="{{ duration: 600, delay: 300 }}">
          حاسبة استهلاك الأجهزة الكهربائية
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div in:fly="{{ y: 50, duration: 500, delay: 150, easing: quintOut }}">
              <h2 class="text-3xl font-semibold mb-8 text-indigo-800">الأجهزة الشائعة</h2>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {#each commonAppliances as appliance, index}
                      <button
                          class="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center"
                          on:click={() => selectedAppliances = [...selectedAppliances, appliance]}
                          in:scale="{{ duration: 300, delay: 50 * index }}"
                      >
                          <span class="text-4xl mb-2">{applianceIcons[appliance.name] || '🔌'}</span>
                          <h3 class="font-semibold text-indigo-700 text-lg mb-2">{appliance.name}</h3>
                          <p class="text-sm text-gray-600">{appliance.avgWattage} واط، {appliance.dailyUseHours} ساعة/يوم</p>
                      </button>
                  {/each}
              </div>

              <h2 class="text-3xl font-semibold mt-16 mb-8 text-indigo-800">إضافة جهاز مخصص</h2>
              <div class="bg-white p-8 rounded-xl shadow-lg">
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <input
                          type="text"
                          bind:value={customAppliance.name}
                          placeholder="اسم الجهاز"
                          class="input input-bordered w-full text-lg"
                      />
                      <input
                          type="number"
                          bind:value={customAppliance.avgWattage}
                          placeholder="الواط"
                          class="input input-bordered w-full text-lg"
                      />
                      <input
                          type="number"
                          bind:value={customAppliance.dailyUseHours}
                          placeholder="ساعات الاستخدام يومياً"
                          class="input input-bordered w-full text-lg"
                      />
                  </div>
                  <button
                      class="btn btn-primary mt-8 w-full text-lg"
                      on:click={addCustomAppliance}
                  >
                      إضافة جهاز مخصص
                  </button>
              </div>
          </div>

          <div in:fly="{{ y: 50, duration: 500, delay: 300, easing: quintOut }}">
              <h2 class="text-3xl font-semibold mb-8 text-indigo-800">الأجهزة المحددة</h2>
              <div class="bg-white p-8 rounded-xl shadow-lg mb-12 min-h-[300px]">
                  {#if selectedAppliances.length === 0}
                      <p class="text-gray-600 text-center text-lg">لم يتم اختيار أي أجهزة بعد.</p>
                  {:else}
                      <ul class="space-y-6">
                          {#each selectedAppliances as appliance, index}
                              <li class="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm" in:fade>
                                  <span class="text-lg">
                                      <span class="text-2xl ml-2">{applianceIcons[appliance.name] || '🔌'}</span>
                                      {appliance.name} ({appliance.avgWattage} واط، {appliance.dailyUseHours} ساعة/يوم)
                                  </span>
                                  <button
                                      class="btn btn-sm btn-error"
                                      on:click={() => removeAppliance(index)}
                                  >
                                      إزالة
                                  </button>
                              </li>
                          {/each}
                      </ul>
                  {/if}
              </div>

              <div class="bg-white p-8 rounded-xl shadow-lg mb-12">
                  <h3 class="text-2xl font-semibold mb-6 text-indigo-700">سعر الكهرباء</h3>
                  <input
                      type="number"
                      bind:value={$electricityRate}
                      step="0.001"
                      class="input input-bordered w-full text-lg"
                  />
                  <p class="text-base text-gray-600 mt-4">السعر الحالي: {$electricityRate} ريال عماني/كيلوواط ساعة</p>
              </div>

              <div class="bg-indigo-100 p-8 rounded-xl shadow-inner">
                  <h3 class="text-2xl font-semibold mb-4 text-indigo-800">إجمالي الاستهلاك الشهري</h3>
                  <p class="text-4xl font-bold text-indigo-600 mb-8">{totalMonthlyUsage.toFixed(2)} كيلوواط ساعة</p>
                  <h3 class="text-2xl font-semibold mb-4 text-indigo-800">التكلفة الشهرية التقديرية</h3>
                  <p class="text-4xl font-bold text-indigo-600">{estimatedMonthlyCost.toFixed(3)} ريال عماني</p>
              </div>
          </div>
      </div>
  </div>
</div>

<style>
  :global(body) {
      @apply bg-gradient-to-br from-blue-50 to-indigo-100;
  }
</style>