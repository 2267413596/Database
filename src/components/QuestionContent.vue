<template>
    <div class="QuestionText">
        <div class="textinner">content</div>
    </div>
</template>

<script>

export default {
    name: 'QuestionContent',
}
</script>

<style>
.QuestionText {
    width: calc(66.7% - 0.5em);
    box-sizing: border-box;
}

.textinner {
    padding: 1em;
    background-color: #fff;
}
</style>
