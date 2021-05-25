describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.visit('http://localhost:3000')
      const user = {
        name: 'admin',
        username: 'root',
        password: 'secret'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3003')
    })

    it('Login form is shown', function() {
      cy.contains('Blog')
    })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.contains('admin logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('qwerty123')
      cy.get('#login-button').click()
      cy.contains('invalid username or password.')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'secret' })
    })

    it('A blog can be created', function() {
     cy.contains('new blog').click()
     cy.get('#title').type('new blog stuff')
     cy.get('#author').type('Tester')
     cy.get('#url').type('https://github.com')
     cy.get('#create-blog').click()
     cy.contains('view').click()
     cy.contains('new blog stuff')
    })
  })

  it('a like button can be pressed', function() {
    cy.contains('new blog').click()
    cy.get('#title').type('testing')
    cy.get('#author').type('Tester')
    cy.get('#url').type('https://github.com')
    cy.contains('submit').click()
    cy.contains('view').click()
    cy.contains('like').click()
    cy.contains('likes: 1')
  })

  it('a blog can be deleted', function() {
    cy.contains('new blog').click()
    cy.get('#title').type('testing delete')
    cy.get('#author').type('deletor')
    cy.get('#url').type('https://github.com')
    cy.contains('submit').click()
    cy.contains('view').click()
    cy.contains('delete').click()
    cy.contains('Blog: testing delete')
  })

  describe('like multiple blogs.', function() {
    beforeEach(function() {
      cy.createBlog({ title: 'test blog 1', author: 'Tester', url: 'https://github.com' })
      cy.createBlog({ title: 'test blog 2', author: 'Tester', url: 'https://github.com' })
      cy.createBlog({ title: 'test blog 3', author: 'Tester', url: 'https://github.com' })
    })
    it('show & like blogs', function () {
      cy.get('#bloglist').find('#label-btn').should(function($blogs) {
        expect($blogs).to.have.length(3)
        $blogs.each(function(index) {
          $blogs[index].click()
        })
      })
      cy.get('#btn-like').should(function($likeBtn) {
        expect($likeBtn).to.have.length(3)
        $likeBtn.each(function(index) {
          for(let i = 0; i < index; i++) {
            $likeBtn[index].click()
          }
        })
      })
      cy.get('#bloglist').find('#div-like').should(function($likes) {
          expect($likes[0]).contain(2)
          expect($likes[1]).contain(1)
          expect($likes[2]).contain(0)
        })
    })
  })
})