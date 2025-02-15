let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/projects/fullstackopen
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +28 exercises/part4/controllers/blogs.js
badd +2 exercises/part4/tests/blogs.test.js
badd +33 term://~/projects/fullstackopen//1212:/bin/bash
badd +4 exercises/part4/tests/users.test.js
badd +1 eslint.config.mjs
badd +1 term://~/projects/fullstackopen//1970:/bin/bash
badd +8 exercises/part4/index.js
badd +27 exercises/part4/app.js
badd +1 exercises/part4/tests/helpers.js
badd +0 exercises/part4/utils/logger.js
argglobal
%argdel
edit exercises/part4/index.js
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
split
1wincmd k
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 27 + 34) / 69)
exe 'vert 1resize ' . ((&columns * 139 + 140) / 280)
exe '2resize ' . ((&lines * 28 + 34) / 69)
exe 'vert 2resize ' . ((&columns * 139 + 140) / 280)
exe '3resize ' . ((&lines * 27 + 34) / 69)
exe 'vert 3resize ' . ((&columns * 140 + 140) / 280)
exe '4resize ' . ((&lines * 28 + 34) / 69)
exe 'vert 4resize ' . ((&columns * 140 + 140) / 280)
exe '5resize ' . ((&lines * 10 + 34) / 69)
argglobal
balt exercises/part4/controllers/blogs.js
setlocal foldmethod=manual
setlocal foldexpr=0
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
silent! normal! zE
let &fdl = &fdl
let s:l = 7 - ((6 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 7
normal! 02|
wincmd w
argglobal
if bufexists(fnamemodify("exercises/part4/tests/helpers.js", ":p")) | buffer exercises/part4/tests/helpers.js | else | edit exercises/part4/tests/helpers.js | endif
if &buftype ==# 'terminal'
  silent file exercises/part4/tests/helpers.js
endif
balt exercises/part4/tests/blogs.test.js
setlocal foldmethod=manual
setlocal foldexpr=0
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
silent! normal! zE
let &fdl = &fdl
let s:l = 18 - ((15 * winheight(0) + 14) / 28)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 18
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("exercises/part4/app.js", ":p")) | buffer exercises/part4/app.js | else | edit exercises/part4/app.js | endif
if &buftype ==# 'terminal'
  silent file exercises/part4/app.js
endif
balt exercises/part4/index.js
setlocal foldmethod=manual
setlocal foldexpr=0
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
silent! normal! zE
let &fdl = &fdl
let s:l = 18 - ((16 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 18
normal! 020|
wincmd w
argglobal
if bufexists(fnamemodify("exercises/part4/utils/logger.js", ":p")) | buffer exercises/part4/utils/logger.js | else | edit exercises/part4/utils/logger.js | endif
if &buftype ==# 'terminal'
  silent file exercises/part4/utils/logger.js
endif
balt exercises/part4/tests/helpers.js
setlocal foldmethod=manual
setlocal foldexpr=0
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
silent! normal! zE
let &fdl = &fdl
let s:l = 7 - ((6 * winheight(0) + 14) / 28)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 7
normal! 02|
wincmd w
argglobal
if bufexists(fnamemodify("term://~/projects/fullstackopen//1970:/bin/bash", ":p")) | buffer term://~/projects/fullstackopen//1970:/bin/bash | else | edit term://~/projects/fullstackopen//1970:/bin/bash | endif
if &buftype ==# 'terminal'
  silent file term://~/projects/fullstackopen//1970:/bin/bash
endif
balt exercises/part4/controllers/blogs.js
setlocal foldmethod=manual
setlocal foldexpr=0
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
let s:l = 1495 - ((9 * winheight(0) + 5) / 10)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 1495
normal! 052|
wincmd w
5wincmd w
exe '1resize ' . ((&lines * 27 + 34) / 69)
exe 'vert 1resize ' . ((&columns * 139 + 140) / 280)
exe '2resize ' . ((&lines * 28 + 34) / 69)
exe 'vert 2resize ' . ((&columns * 139 + 140) / 280)
exe '3resize ' . ((&lines * 27 + 34) / 69)
exe 'vert 3resize ' . ((&columns * 140 + 140) / 280)
exe '4resize ' . ((&lines * 28 + 34) / 69)
exe 'vert 4resize ' . ((&columns * 140 + 140) / 280)
exe '5resize ' . ((&lines * 10 + 34) / 69)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
nohlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
