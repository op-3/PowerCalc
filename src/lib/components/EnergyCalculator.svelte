<script lang="ts">
  import { calculateBill } from '$lib/utils/calculateBill';
  import type { TariffType, AccountType } from '$lib/types';

  import { fade, fly } from 'svelte/transition';
  import { spring } from 'svelte/motion';

  let consumption = 0;
  let selectedTariff: TariffType = 'residential';
  let accountType: AccountType = 'basic';
  let month = new Date().getMonth() + 1;
  let bill = spring(0);
  let isCalculating = false;

  const tariffTypes: { value: TariffType; label: string; icon: string }[] = [
    { value: 'residential', label: 'سكني', icon: '🏠' },
    { value: 'nationalSupport', label: 'الدعم الوطني', icon: '🏛️' },
    { value: 'agricultural', label: 'زراعي', icon: '🌾' },
    { value: 'nonResidential', label: 'غير سكني', icon: '🏢' }
  ];

  const accountTypes: { value: AccountType; label: string }[] = [
    { value: 'basic', label: 'أساسي (حسابين أو أقل)' },
    { value: 'additional', label: 'إضافي (أكثر من حسابين)' }
  ];

  const months = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  async function handleCalculate() {
    isCalculating = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    const calculatedBill = calculateBill(consumption, selectedTariff, accountType, month);
    bill.set(calculatedBill);
    isCalculating = false;
  }

  $: showAccountType = selectedTariff === 'residential';
  $: showMonth = selectedTariff === 'nonResidential';
</script>

<div class="bg-base-200 p-8 rounded-xl shadow-lg">
  <h2 class="text-3xl font-bold mb-8 text-center text-primary">حاسبة فاتورة الكهرباء</h2>
  
  <div class="space-y-6">
      <div class="form-control" in:fly="{{ y: 20, duration: 300, delay: 100 }}">
          <label for="consumption" class="label">
              <span class="label-text text-lg">الاستهلاك (كيلوواط/ساعة)</span>
          </label>
          <input
              type="number"
              id="consumption"
              bind:value={consumption}
              class="input input-bordered w-full text-xl"
              min="0"
              placeholder="أدخل الاستهلاك"
          />
      </div>

      <div class="form-control" in:fly="{{ y: 20, duration: 300, delay: 200 }}">
          <label for="tariff" class="label">
              <span class="label-text text-lg">نوع التعرفة</span>
          </label>
          <select
              id="tariff"
              bind:value={selectedTariff}
              class="select select-bordered w-full text-xl"
          >
              {#each tariffTypes as tariff}
                  <option value={tariff.value}>{tariff.icon} {tariff.label}</option>
              {/each}
          </select>
      </div>

      {#if showAccountType}
          <div class="form-control" in:fly="{{ y: 20, duration: 300, delay: 300 }}">
              <label for="accountType" class="label">
                  <span class="label-text text-lg">نوع الحساب</span>
              </label>
              <select
                  id="accountType"
                  bind:value={accountType}
                  class="select select-bordered w-full text-xl"
              >
                  {#each accountTypes as type}
                      <option value={type.value}>{type.label}</option>
                  {/each}
              </select>
          </div>
      {/if}

      {#if showMonth}
          <div class="form-control" in:fly="{{ y: 20, duration: 300, delay: 300 }}">
              <label for="month" class="label">
                  <span class="label-text text-lg">الشهر</span>
              </label>
              <select
                  id="month"
                  bind:value={month}
                  class="select select-bordered w-full text-xl"
              >
                  {#each months as monthName, index}
                      <option value={index + 1}>{monthName}</option>
                  {/each}
              </select>
          </div>
      {/if}

      <button
          on:click={handleCalculate}
          class="btn btn-primary w-full mt-6 text-xl"
          disabled={isCalculating}
      >
          {#if isCalculating}
              <span class="loading loading-spinner"></span>
              جاري الحساب...
          {:else}
              احسب الفاتورة
          {/if}
      </button>

      {#if $bill > 0}
          <div class="alert alert-success mt-8" in:fly="{{ y: 20, duration: 300 }}">
              <h3 class="font-semibold text-xl mb-2">نتيجة الحساب:</h3>
              <p class="text-3xl font-bold">{$bill.toFixed(3)} ريال عماني</p>
          </div>
      {/if}
  </div>
</div>