<script lang="ts">
    import { fade, slide, scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    const tariffData = {
        residential: {
            name: "تسعيرة الكهرباء للقطاع السكني",
            types: [
                { name: "الحساب الأساسي (حسابين أو أقل)", tiers: [
                    { range: "من 0 إلى 4000", price: 14 },
                    { range: "من 4001 إلى 6000", price: 18 },
                    { range: "أكثر من 6000", price: 32 }
                ]},
                { name: "الحساب الإضافي (أكثر من حسابين)", tiers: [
                    { range: "من 0 إلى 4000", price: 22 },
                    { range: "من 4001 إلى 6000", price: 26 },
                    { range: "أكثر من 6000", price: 32 }
                ]}
            ]
        },
        nationalSupport: {
            name: "تسعيرة الكهرباء مع الدعم الوطني",
            tiers: [
                { range: "من 0 إلى 4000", price: 10 },
                { range: "من 4001 إلى 6000", price: 13 },
                { range: "أكثر من 6000", price: 20 }
            ]
        },
        agricultural: {
            name: "تسعيرة الكهرباء للقطاع الزراعي",
            tiers: [
                { range: "من 0 إلى 3000", price: 12 },
                { range: "من 3001 إلى 6000", price: 16 },
                { range: "أكثر من 6000", price: 24 }
            ]
        },
        nonResidential: {
            name: "تسعيرة الكهرباء للقطاع غير السكني",
            tiers: [
                { 
                    consumption: "أقل من 100 ميجا واط / ساعة",
                    winter: { period: "بين أكتوبر إلى أبريل", price: 21 },
                    summer: { period: "بين مايو إلى سبتمبر", price: 29 }
                },
                {
                    consumption: "أكثر من 100 ميجا واط / ساعة",
                    period: "طوال أشهر السنة",
                    price: "يتم حساب التسعيرة بحسب التعرفة المنعكسة عن التكلفة"
                }
            ]
        }
    };

    const categoryIcons = {
        residential: '🏠',
        nationalSupport: '🏛️',
        agricultural: '🚜',
        nonResidential: '🏢'
    };

    let activeCategory: string | null = null;
    let hoveredCategory: string | null = null;

    function toggleCategory(category: string) {
        activeCategory = activeCategory === category ? null : category;
    }
</script>

<svelte:head>
    <title>PowerCalc - تسعيرة الكهرباء</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6" dir="rtl">
    <div class="max-w-7xl mx-auto">
        <h1 class="text-5xl font-bold text-center mb-12 text-indigo-900" in:fade="{{ duration: 600, delay: 300 }}">
            تسعيرة الكهرباء
        </h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {#each Object.entries(tariffData) as [category, data], index}
                <div 
                    class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:scale-105"
                    on:click={() => toggleCategory(category)}
                    on:keydown={(e) => e.key === 'Enter' && toggleCategory(category)}
                    on:mouseenter={() => hoveredCategory = category}
                    on:mouseleave={() => hoveredCategory = null}
                    tabindex="0"
                    in:scale="{{ duration: 400, delay: 150 * index, easing: quintOut }}"
                >
                    <div class="p-6 relative">
                        <div class="absolute top-0 right-0 m-4 text-6xl opacity-10 transform -rotate-12 transition-all duration-300" class:opacity-25={hoveredCategory === category}>
                            {categoryIcons[category]}
                        </div>
                        <h2 class="text-2xl font-semibold mb-3 text-indigo-800">
                            {data.name}
                        </h2>
                        <p class="text-indigo-600 font-medium">انقر للتفاصيل</p>
                    </div>
                </div>
            {/each}
        </div>

        {#if activeCategory}
            <div transition:slide="{{ duration: 400 }}" class="mt-12 bg-white p-8 rounded-2xl shadow-xl">
                <h2 class="text-3xl font-bold mb-8 text-indigo-900 flex items-center">
                    <span class="text-5xl ml-3">{categoryIcons[activeCategory]}</span>
                    {tariffData[activeCategory].name}
                </h2>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-indigo-100">
                                <th class="text-right p-4 text-indigo-800">الاستهلاك (كيلو واط / ساعة)</th>
                                {#if activeCategory === 'residential'}
                                    <th class="text-center p-4 text-indigo-800">الحساب الأساسي (بيسة)</th>
                                    <th class="text-center p-4 text-indigo-800">الحساب الإضافي (بيسة)</th>
                                {:else if activeCategory === 'nonResidential'}
                                    <th class="text-center p-4 text-indigo-800">الفترة</th>
                                    <th class="text-center p-4 text-indigo-800">التعرفة (بيسة)</th>
                                {:else}
                                    <th class="text-center p-4 text-indigo-800">التعرفة (بيسة)</th>
                                {/if}
                            </tr>
                        </thead>
                        <tbody>
                            {#if activeCategory === 'residential'}
                                {#each tariffData[activeCategory].types as type, typeIndex}
                                    <tr class="bg-indigo-50">
                                        <td colspan="3" class="font-semibold p-4 text-indigo-700">{type.name}</td>
                                    </tr>
                                    {#each type.tiers as tier, tierIndex}
                                        <tr class="hover:bg-blue-50 transition-colors duration-150" in:fade="{{ duration: 200, delay: 50 * (typeIndex * 3 + tierIndex) }}">
                                            <td class="text-right p-4">{tier.range}</td>
                                            <td class="text-center p-4">{tier.price}</td>
                                            <td class="text-center p-4">{tier.price}</td>
                                        </tr>
                                    {/each}
                                {/each}
                            {:else if activeCategory === 'nonResidential'}
                                {#each tariffData[activeCategory].tiers as tier, index}
                                    <tr class="hover:bg-blue-50 transition-colors duration-150" in:fade="{{ duration: 200, delay: 50 * index }}">
                                        <td class="text-right p-4 font-semibold" rowspan={tier.winter ? 2 : 1}>{tier.consumption}</td>
                                        {#if tier.winter}
                                            <td class="text-center p-4">{tier.winter.period}</td>
                                            <td class="text-center p-4">{tier.winter.price}</td>
                                        {:else}
                                            <td class="text-center p-4">{tier.period}</td>
                                            <td class="text-center p-4">{tier.price}</td>
                                        {/if}
                                    </tr>
                                    {#if tier.summer}
                                        <tr class="hover:bg-blue-50 transition-colors duration-150" in:fade="{{ duration: 200, delay: 50 * index + 25 }}">
                                            <td class="text-center p-4">{tier.summer.period}</td>
                                            <td class="text-center p-4">{tier.summer.price}</td>
                                        </tr>
                                    {/if}
                                {/each}
                            {:else}
                                {#each tariffData[activeCategory].tiers as tier, index}
                                    <tr class="hover:bg-blue-50 transition-colors duration-150" in:fade="{{ duration: 200, delay: 50 * index }}">
                                        <td class="text-right p-4">{tier.range}</td>
                                        <td class="text-center p-4">{tier.price}</td>
                                    </tr>
                                {/each}
                            {/if}
                        </tbody>
                    </table>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    :global(body) {
        @apply bg-gradient-to-br from-blue-50 to-indigo-100;
    }
    
    @media (max-width: 640px) {
        table {
            font-size: 0.875rem;
        }
        th, td {
            padding: 0.75rem 0.5rem;
        }
    }
</style>