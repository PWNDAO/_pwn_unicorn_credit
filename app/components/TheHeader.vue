<template>
  <nav class="flex justify-between p-8">
    <div class="text-primary">🦄 Unicorn Credit</div>
    <div>
      <ul class="flex gap-6">
        <li>
          <NuxtLink v-slot="{ isActive }" to="/borrow">
            <span :class="getLinkClasses(isActive)">Borrow</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink v-slot="{ isActive }" to="/lend">
            <span :class="getLinkClasses(isActive)">Lend</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div>
      <TheWallet />
    </div>
  </nav>
</template>

<script setup lang="ts">
const getLinkClasses = (isActive: boolean) => {
  const sharedClasses = ['px-4', 'py-2', 'w-6', 'h-6']

  if (isActive) {
    return ['text-foreground', 'rounded-lg', 'bg-neutral-500/50', ...sharedClasses]
  }
 
  return ['text-neutral-400', ...sharedClasses]
}
</script>
