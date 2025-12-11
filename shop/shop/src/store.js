import { configureStore, createSlice } from '@reduxjs/toolkit'

// 'user'라는 이름의 상태 만들기
let user = createSlice({
    name : 'user',
    initialState : { name : '홍길동', age : 20 }, // 처음 상태 값
    reducers :{
      changeName(state){ // 이름을 '손오공'으로 바꾸는 함수
        state.name = '손오공'
    },

// 나이를 전달받은 숫자만큼 올려주는 함수
    increase(state, action){
        state.age += action.payload
    }
    }
})

// 위에서 만든 함수들 밖에서도 쓸 수 있게 내보내기
export let { changeName, increase } = user.actions

// 'cart'라는 이름의 상태 만들기 (장바구니)
let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 1, imgurl:'fruit1.jpg', name : '수박', count : 2},
        {id : 2, imgurl:'fruit2.jpg', name : '참외', count : 1},
        {id : 3, imgurl:'fruit3.jpg', name : '사과', count : 1}
    ],
    reducers : {
     // 상품 수량 1개 늘리기
        addCount(state, action) {  
            let num = state.findIndex((a) => {
                return a.id === action.payload;
            });
            console.log(num);
            console.log("내가 선택한 상품"+ action.payload);
            console.log("내가 추가한 상품아이디는"+ state[num].id);
            console.log("내가 추가한 상품갯수는"+ state[num].count);

            state[num].count++;
        },
        // 상품 수량 1개 줄이기 (0개 이하는 알림 띄움)
        decreaseCount(state, action) {
            let num = state.findIndex((a) => {
            return a.id === action.payload;
            });
            console.log(num);
            if (state[num].count > 0) {
            state[num].count--;
            } else if (state[num].count === 0) {
            alert("상품이 더 이상 없습니다.");
            }
        },
            // 장바구니에 상품 추가하기, 이미 있으면 수량만 +1, 없으면 새로 추가
        addItem(state, action) {
            let num = state.findIndex((a) => a.id === action.payload.id);
            if (num !== -1) {
            state[num].count++;
            } else {
            state.push(action.payload);
            }
        },
        // 장바구니에서 상품 삭제하기
        deleteItem(state, action) {
            let num = state.findIndex((a) => {
            return a.id === action.payload;
            });
            state.splice(num, 1);
        },
        // 이름순으로 상품 정렬하기
        sortName(state, action) {
            state.sort((a, b) => (a.name > b.name ? 1 : -1));
        }
    }
})


// cart 함수들도 밖에서 쓸 수 있게 내보내기
export let { addCount, decreaseCount, addItem, deleteItem, sortName } = cart.actions;


// 실제로 Redux에 등록해주는 부분
export default configureStore({
    reducer: {
        user: user.reducer,
        cart: cart.reducer,
    },
});


/*
createSlice: 상태랑 관련 함수들 한 번에 만들기
reducers: 상태를 바꿔주는 함수들
action.payload: 함수에 보낼 값
configureStore: 만든 상태들을 Redux에 등록하는 역할
  */