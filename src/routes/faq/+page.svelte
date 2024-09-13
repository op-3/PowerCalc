<script lang="ts">
  const faqs = [
      {
          question: "كيف يتم حساب فاتورة الكهرباء الخاصة بي؟",
          answer: "يتم حساب فاتورة الكهرباء الخاصة بك بناءً على استهلاكك بالكيلوواط ساعة (kWh) وسعر التعرفة المطبق. قد تختلف التعرفة حسب مستوى استهلاكك ونوع الحساب والموسم."
      },
      {
          question: "ما هي أنواع تعرفة الكهرباء المختلفة في عُمان؟",
          answer: "في عُمان عدة أنواع من تعرفة الكهرباء تشمل السكنية، والدعم الوطني، والزراعية، وغير السكنية. لكل نوع هيكل أسعار خاص به وقد يحتوي على شرائح مختلفة بناءً على مستويات الاستهلاك."
      },
      {
          question: "كيف يمكنني تقليل فاتورة الكهرباء الخاصة بي؟",
          answer: "يمكنك تقليل فاتورة الكهرباء الخاصة بك من خلال تنفيذ تدابير توفير الطاقة مثل استخدام الأجهزة الموفرة للطاقة، وتحسين عزل منزلك، وضبط الثرموستات، والانتباه لعادات استخدام الطاقة. راجع صفحة نصائح توفير الطاقة لدينا للحصول على نصائح أكثر تفصيلاً."
      },
      {
          question: "ما هو الفرق بين أسعار الصيف والشتاء؟",
          answer: "بعض أنواع التعرفة، خاصة للعملاء غير السكنيين، لديها أسعار مختلفة للصيف (مايو إلى سبتمبر) والشتاء (أكتوبر إلى أبريل). هذا لمراعاة ارتفاع الطلب على الطاقة خلال أشهر الصيف الحارة."
      },
      {
          question: "ما مدى دقة تقدير الفاتورة في PowerCalc؟",
          answer: "يستخدم PowerCalc أحدث معلومات التعرفة المتاحة لتقديم تقديرات دقيقة. ومع ذلك، قد تختلف الفواتير الفعلية قليلاً بسبب عوامل مثل فترات الفوترة الدقيقة، أو أي رسوم أو ضرائب إضافية، أو تغييرات في هياكل التعرفة التي قد لا يتم تحديثها فوراً في نظامنا."
      }
  ];

  let activeIndex = -1;

  function toggleFAQ(index: number) {
      activeIndex = activeIndex === index ? -1 : index;
  }
</script>

<svelte:head>
  <title>PowerCalc - الأسئلة الشائعة</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 p-6" dir="rtl">
  <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-12 text-gray-900">
          الأسئلة الشائعة
      </h1>

      <div class="space-y-6">
          {#each faqs as faq, index}
              <div class="bg-white rounded-lg shadow-md">
                  <button
                      class="w-full text-right p-6 focus:outline-none"
                      on:click={() => toggleFAQ(index)}
                  >
                      <h2 class="text-xl font-semibold text-gray-800 flex items-center justify-between">
                          <span>{index + 1}. {faq.question}</span>
                          <svg class="w-6 h-6 transform transition-transform duration-300 {activeIndex === index ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                      </h2>
                  </button>
                  {#if activeIndex === index}
                      <div class="px-6 pb-6">
                          <p class="text-gray-700 text-lg">{faq.answer}</p>
                      </div>
                  {/if}
              </div>
          {/each}
      </div>
  </div>
</div>