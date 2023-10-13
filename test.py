a = 123456
b = 543121

def count(n):
   num = 0
   while n:
      num += n & 1
      n >>= 1
   return num

for i in range(100000,101000,123):
   aa = a & i
   bb = b & i

   print(count(aa), bb,count(bb))
   